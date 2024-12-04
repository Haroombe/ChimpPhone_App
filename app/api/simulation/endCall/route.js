import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { call_id, duration } = await req.json();

        if (!call_id || isNaN(duration) || duration <= 0) {
            return NextResponse.json(
                { success: false, error: 'Invalid call ID or duration.' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN'); // Start transaction

            // Step 1.1: Fetch Call Information
            const fetchCallInfoQuery = `
                SELECT 
                    call_id, start_time, from_phone_number, to_number, call_type, country_code 
                FROM call_log 
                WHERE call_id = $1 AND end_time IS NULL
                LIMIT 1;
            `;
            const callInfoResult = await client.query(fetchCallInfoQuery, [call_id]);

            if (callInfoResult.rowCount === 0) {
                throw new Error('Call not found or already ended.');
            }

            const callInfo = callInfoResult.rows[0];
            const isInternational = callInfo.country_code != null;

            // Step 1.2: Fetch Plan Information
            const fetchPlanInfoQuery = `
                SELECT 
                    s.plan_id, s.prepaid_balance, pp.plan_type, pp.rate_per_minute, 
                    pp.international_rate, pp.rate_per_MB
                FROM subscription s
                INNER JOIN phone_plan pp ON s.plan_id = pp.plan_id
                WHERE s.customer_id = (
                    SELECT customer_id
                    FROM phone_number_list
                    WHERE phone_number = $1
                ) AND s.active = TRUE
                LIMIT 1;
            `;
            const planInfoResult = await client.query(fetchPlanInfoQuery, [callInfo.from_phone_number]);
            console.log(planInfoResult);
            if (planInfoResult.rowCount === 0) {
                throw new Error('No active subscription found for the customer.');
            }

            const planInfo = planInfoResult.rows[0];
            const ratePerMinute = isInternational ? parseFloat(planInfo.international_rate) : parseFloat(planInfo.rate_per_minute);
            const ratePerMB = parseFloat(planInfo.rate_per_mb) || 0;
            //console.log(ratePerMinute);
            //console.log(ratePerMB);

            
            // Step 2: Calculate Costs
            const callCost = duration * ratePerMinute;
            const dataUsed = duration * 0.5; // Simulated 0.5 MB per minute
            const dataCost = dataUsed * ratePerMB;
            const totalCost = callCost + dataCost;

            // Step 3: Update Call Log
            const updateCallLogQuery = `
                UPDATE call_log
                SET end_time = start_time + ($1 || ' minutes')::interval, 
                    duration = $2, total_cost = $4
                WHERE call_id = $3
                RETURNING duration;
            `;
            await client.query(updateCallLogQuery, [duration, duration, call_id, totalCost]);

            // Step 4: Billing Cycle Management
            const subscriptionIdQuery = `
                SELECT subscription_id
                FROM subscription
                WHERE plan_id = $1 AND active = TRUE
                LIMIT 1;
            `;
            const subscriptionResult = await client.query(subscriptionIdQuery, [planInfo.plan_id]);

            if (subscriptionResult.rowCount === 0) {
                throw new Error('Active subscription not found for the plan.');
            }

            const subscriptionId = subscriptionResult.rows[0].subscription_id;

            const billingCycleCheckQuery = `
                SELECT 1
                FROM billing_cycle
                WHERE subscription_id = $1 AND status = 'unpaid'
                LIMIT 1;
            `;
            const billingCycleResult = await client.query(billingCycleCheckQuery, [subscriptionId]);

            if (billingCycleResult.rowCount === 0) {
                const createBillingCycleQuery = `
                    INSERT INTO billing_cycle (
                        subscription_id, billing_date, start_date, end_date, 
                        subscription_charge, call_charge, sms_charge, data_charge, 
                        tax, total_charge, status
                    )
                    VALUES ($1, CURRENT_DATE, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', 
                            0, 0, 0, 0, 0, 0, 'unpaid');
                `;
                await client.query(createBillingCycleQuery, [subscriptionId]);
            }

            if (['postpaid', 'unlimited', 'travel'].includes(planInfo.plan_type)) {
                const updateBillingCycleQuery = `
                    UPDATE billing_cycle
                    SET call_charge = COALESCE(call_charge, 0) + $1,
                        data_charge = COALESCE(data_charge, 0) + $2,
                        total_charge = COALESCE(total_charge, 0) + $3
                    WHERE subscription_id = $4 AND status = 'unpaid';
                `;
                await client.query(updateBillingCycleQuery, [
                    callCost,
                    dataCost,
                    totalCost,
                    subscriptionId,
                ]);
            } else if (planInfo.plan_type === 'prepaid') {
                if (planInfo.prepaid_balance < totalCost) {
                    throw new Error('Insufficient prepaid balance.');
                }

                const updatePrepaidBalanceQuery = `
                    UPDATE subscription
                    SET prepaid_balance = prepaid_balance - $1
                    WHERE subscription_id = $2;
                `;
                await client.query(updatePrepaidBalanceQuery, [totalCost, subscriptionId]);
            }

            // Step 5: Update Data Usage
            const usageTable = isInternational ? 'international_data_usage' : 'data_usage';
            const updateDataUsageQuery = `
                INSERT INTO ${usageTable} (phone_number, month, data_used, cost)
                VALUES ($1, DATE_TRUNC('month', CURRENT_DATE), $2, $3)
                ON CONFLICT (phone_number, month)
                DO UPDATE SET data_used = ${usageTable}.data_used + $2, cost = ${usageTable}.cost + $3;
            `;
            await client.query(updateDataUsageQuery, [callInfo.from_phone_number, dataUsed, dataCost]);

            await client.query('COMMIT');
            await client.query('END');
            return NextResponse.json({
                success: true,
                message: 'Call ended successfully.',
                data: { duration, totalCost, callCost, dataCost },
            });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: error.message || 'Internal server error.' },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in request:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
