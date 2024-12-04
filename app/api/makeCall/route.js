import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { customer_id, phone_number, to_number, country_code, call_duration } = await req.json();

        // Validate required inputs
        if (!customer_id || !phone_number || !to_number || call_duration == null) {
            return NextResponse.json(
                { success: false, error: 'Required fields: customer_id, phone_number, to_number, call_duration.' },
                { status: 400 }
            );
        }

        // Ensure call_duration is a valid integer
        const duration = parseInt(call_duration, 10);
        if (isNaN(duration) || duration <= 0) {
            return NextResponse.json(
                { success: false, error: 'Call duration must be a positive integer.' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Step 1: Fetch Subscription Details
            const subscriptionQuery = `
                SELECT s.subscription_id, s.plan_id, s.prepaid_balance, pp.plan_type, pp.rate_per_minute, pp.international_rate, pp.rate_per_MB
                FROM subscription s
                INNER JOIN phone_plan pp ON s.plan_id = pp.plan_id
                WHERE s.customer_id = $1 AND s.active = TRUE
                LIMIT 1;
            `;
            const subscriptionResult = await client.query(subscriptionQuery, [customer_id]);

            if (subscriptionResult.rowCount === 0) {
                throw new Error('No active subscription found for the customer.');
            }

            const subscription = subscriptionResult.rows[0];
            const {
                subscription_id,
                plan_id,
                prepaid_balance,
                plan_type,
                rate_per_minute,
                international_rate,
                rate_per_MB
            } = subscription;

            // Step 2: Determine Call Type and Costs
            const isInternational = country_code != null;
            const call_type = isInternational ? 'international' : 'domestic';
            const perMinuteRate = isInternational ? international_rate : rate_per_minute;
            const callCost = duration * (perMinuteRate ?? 0);

            // Calculate data usage and cost
            const dataUsed = duration * 0.05; // Simulated 0.05 MB per minute
            const dataCost = dataUsed * (rate_per_MB ?? 0);
            const totalCost = callCost + dataCost;

            // Step 3: Determine Area ID or Provider ID
            let areaId = null;
            let providerId = null;

            if (!isInternational) {
                const areaQuery = `
                    SELECT area_id
                    FROM home_area
                    WHERE active = TRUE
                    ORDER BY RANDOM()
                    LIMIT 1;
                `;
                const areaResult = await client.query(areaQuery);
                if (areaResult.rowCount > 0) {
                    areaId = areaResult.rows[0].area_id;
                }
            } else {
                const providerQuery = `
                    SELECT provider_id
                    FROM partner_provider
                    WHERE country_code = $1
                    ORDER BY RANDOM()
                    LIMIT 1;
                `;
                const providerResult = await client.query(providerQuery, [country_code]);
                if (providerResult.rowCount > 0) {
                    providerId = providerResult.rows[0].provider_id;
                }
            }

            // Step 4: Billing or Prepaid Balance Management
            if (plan_type === 'prepaid') {
                if (prepaid_balance < totalCost) {
                    throw new Error('Insufficient prepaid balance.');
                }

                const updatePrepaidBalanceQuery = `
                    UPDATE subscription
                    SET prepaid_balance = prepaid_balance - $1
                    WHERE subscription_id = $2;
                `;
                await client.query(updatePrepaidBalanceQuery, [totalCost, subscription_id]);
            } else {
                const checkBillingCycleQuery = `
                    SELECT 1 
                    FROM billing_cycle
                    WHERE subscription_id = $1 AND status = 'unpaid'
                    LIMIT 1;
                `;
                const billingCycleResult = await client.query(checkBillingCycleQuery, [subscription_id]);

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
                    await client.query(createBillingCycleQuery, [subscription_id]);
                }

                const updateBillingCycleQuery = `
                    UPDATE billing_cycle
                    SET call_charge = COALESCE(call_charge, 0) + $1,
                        data_charge = COALESCE(data_charge, 0) + $2,
                        total_charge = COALESCE(total_charge, 0) + $3
                    WHERE subscription_id = $4 AND status = 'unpaid';
                `;
                await client.query(updateBillingCycleQuery, [callCost, dataCost, totalCost, subscription_id]);
            }

            // Step 5: Log Call Details
            const insertCallLogQuery = `
                INSERT INTO call_log (
                    from_phone_number, to_number, start_time, end_time, duration, call_type, roaming_cost, total_cost, country_code, area_id
                ) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + ($3 * interval '1 minute'), $3, $4, $5, $6, $7, $8);
            `;
            await client.query(insertCallLogQuery, [
                phone_number,
                to_number,
                duration,
                call_type,
                isInternational ? callCost : 0,
                totalCost,
                country_code,
                areaId
            ]);

            // Step 6: Update Data Usage
            const usageTable = isInternational ? 'international_data_usage' : 'data_usage';
            const updateDataUsageQuery = `
                INSERT INTO ${usageTable} (phone_number, month, data_used, cost)
                VALUES ($1, DATE_TRUNC('month', CURRENT_DATE), $2, $3)
                ON CONFLICT (phone_number, month)
                DO UPDATE SET data_used = ${usageTable}.data_used + $2, cost = ${usageTable}.cost + $3;
            `;
            await client.query(updateDataUsageQuery, [phone_number, dataUsed, dataCost]);

            
            await client.query('COMMIT');
            await client.query('END');

            return NextResponse.json(
                { success: true, message: 'Call processed successfully.', data: { totalCost } },
                { status: 200 }
            );
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
        console.error('Error in make_call API:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
