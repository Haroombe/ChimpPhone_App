import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { customer_id, phone_number, to_number, country_code, message_text } = await req.json();

        // Validate required inputs
        if (!customer_id || !phone_number || !to_number || !message_text) {
            return NextResponse.json(
                { success: false, error: 'Required fields: customer_id, phone_number, to_number, message_text.' },
                { status: 400 }
            );
        }

        const charCount = message_text.length;
        if (charCount === 0) {
            return NextResponse.json(
                { success: false, error: 'Message text cannot be empty.' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Step 1: Fetch Subscription Details
            const subscriptionQuery = `
                SELECT s.subscription_id, s.plan_id, s.prepaid_balance, pp.plan_type, pp.rate_per_char, pp.international_rate
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
                rate_per_char,
                international_rate
            } = subscription;

            // Step 2: Determine SMS Type and Costs
            const isInternational = country_code != null;
            const perCharRate = isInternational ? international_rate : rate_per_char;
            const smsCost = charCount * (perCharRate ?? 0);

            if (smsCost === 0) {
                throw new Error('SMS cost calculation failed. Please check the rates.');
            }

            // Step 3: Determine Area ID for Domestic SMS
            let areaId = null;
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
            }

            // Step 4: Handle Billing or Prepaid Balance
            if (plan_type === 'prepaid') {
                if (prepaid_balance < smsCost) {
                    throw new Error('Insufficient prepaid balance.');
                }

                const updatePrepaidBalanceQuery = `
                    UPDATE subscription
                    SET prepaid_balance = prepaid_balance - $1
                    WHERE subscription_id = $2;
                `;
                await client.query(updatePrepaidBalanceQuery, [smsCost, subscription_id]);
            } else {
                // For postpaid, update the billing cycle
                const checkBillingCycleQuery = `
                    SELECT 1
                    FROM billing_cycle
                    WHERE subscription_id = $1 AND status = 'unpaid'
                    LIMIT 1;
                `;
                const billingCycleResult = await client.query(checkBillingCycleQuery, [subscription_id]);

                if (billingCycleResult.rowCount === 0) {
                    // Create a new billing cycle if none exists
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
                    SET sms_charge = COALESCE(sms_charge, 0) + $1, 
                        total_charge = COALESCE(total_charge, 0) + $1
                    WHERE subscription_id = $2 AND status = 'unpaid';
                `;
                await client.query(updateBillingCycleQuery, [smsCost, subscription_id]);
            }

            // Step 5: Log SMS Details
            const insertSmsLogQuery = `
                INSERT INTO sms_log (
                    phone_number, time, area_id, country_code, char_count, to_number, roaming_cost, discount, total_cost
                ) VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4, $5, $6, $7, $8);
            `;
            await client.query(insertSmsLogQuery, [
                phone_number,
                areaId,
                isInternational ? country_code : null,
                charCount,
                to_number,
                isInternational ? smsCost : 0, // Roaming cost for international SMS
                0, // Discount
                smsCost
            ]);

            await client.query('COMMIT');
            await client.query('END');

            return NextResponse.json(
                { success: true, message: 'SMS logged successfully.', data: { charCount, smsCost } },
                { status: 200 }
            );
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback on error
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: error.message || 'Internal server error.' },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in sendSMS API:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
