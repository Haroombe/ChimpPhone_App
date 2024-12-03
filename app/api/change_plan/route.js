import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            customer_id,
            new_plan_id,
            promotion_id = null,
            prepaid_balance = null,
        } = body;

        if (!customer_id || !new_plan_id) {
            return NextResponse.json(
                { success: false, error: 'Required fields: customer_id and new_plan_id.' },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Step 1: End the current active subscription
            const endSubscriptionQuery = `
                UPDATE subscription
                SET active = FALSE, 
                    end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE;
            `;
            await client.query(endSubscriptionQuery, [customer_id]);

            // Step 2: Close the current billing cycle for the old subscription
            const closeBillingCycleQuery = `
                UPDATE billing_cycle
                SET 
                    end_date = CURRENT_DATE,
                    status = CASE 
                        WHEN CURRENT_DATE > end_date THEN 'overdue'
                        ELSE status
                    END
                WHERE subscription_id = (
                    SELECT subscription_id 
                    FROM subscription 
                    WHERE customer_id = $1 AND active = FALSE 
                    ORDER BY end_date DESC 
                    LIMIT 1
                );
            `;
            await client.query(closeBillingCycleQuery, [customer_id]);

            // Step 3: Add a new subscription with the new plan
            const addSubscriptionQuery = `
                INSERT INTO subscription (customer_id, plan_id, start_date, active, promotion_id, prepaid_balance)
                VALUES ($1, $2, CURRENT_DATE, TRUE, $3, $4)
                RETURNING subscription_id;
            `;
            const addSubscriptionResult = await client.query(addSubscriptionQuery, [
                customer_id,
                new_plan_id,
                promotion_id,
                prepaid_balance,
            ]);

            const new_subscription_id = addSubscriptionResult.rows[0]?.subscription_id;
            if (!new_subscription_id) {
                throw new Error('Failed to create a new subscription.');
            }

            // Step 4: Fetch the monthly charge for the new plan
            const fetchMonthlyChargeQuery = `
                SELECT monthly_charge
                FROM phone_plan
                WHERE plan_id = $1;
            `;
            const fetchMonthlyChargeResult = await client.query(fetchMonthlyChargeQuery, [new_plan_id]);
            const new_subscription_charge = fetchMonthlyChargeResult.rows[0]?.monthly_charge;

            if (new_subscription_charge === undefined) {
                throw new Error('Failed to fetch the monthly charge for the new plan.');
            }

            // Step 5: Create a new billing cycle
            const createBillingCycleQuery = `
                INSERT INTO billing_cycle (subscription_id, billing_date, start_date, end_date, subscription_charge, status)
                VALUES ($1, CURRENT_DATE + INTERVAL '31 days', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', $2, 'unpaid');
            `;
            await client.query(createBillingCycleQuery, [new_subscription_id, new_subscription_charge]);

            // Commit transaction
            await client.query('COMMIT');
            // END
            await client.query('END');

            return NextResponse.json(
                { success: true, message: 'Subscription updated successfully.' },
                { status: 200 }
            );
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: `Transaction failed: ${error.message}` },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Internal Server Error:', error.message);
        return NextResponse.json(
            { success: false, error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
