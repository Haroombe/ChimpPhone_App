import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the request body
        const { customer_id } = await req.json();

        if (!customer_id) {
            return NextResponse.json(
                { success: false, error: 'Customer ID is required.' },
                { status: 400 }
            );
        }

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Cancel the current active subscription
            const cancelSubscriptionQuery = `
                UPDATE subscription
                SET active = FALSE, end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE
                RETURNING subscription_id;
            `;
            const cancelSubscriptionResult = await client.query(cancelSubscriptionQuery, [customer_id]);

            if (cancelSubscriptionResult.rowCount === 0) {
                throw new Error('No active subscription found for the provided customer ID.');
            }

            const subscriptionId = cancelSubscriptionResult.rows[0].subscription_id;

            // Fetch the current billing cycle details
            const fetchBillingCycleQuery = `
                SELECT 
                    subscription_charge, 
                    start_date, 
                    end_date 
                FROM billing_cycle
                WHERE subscription_id = $1 
                  AND status = 'unpaid';
            `;
            const billingCycleResult = await client.query(fetchBillingCycleQuery, [subscriptionId]);

            if (billingCycleResult.rowCount === 0) {
                throw new Error('No unpaid billing cycle found for the active subscription.');
            }

            const { subscription_charge, start_date, end_date } = billingCycleResult.rows[0];
            const currentDate = new Date();

            // Calculate the prorated charge in application logic
            const totalDays = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
            const daysPassed = Math.ceil((currentDate - new Date(start_date)) / (1000 * 60 * 60 * 24));
            const proratedCharge = (subscription_charge / totalDays) * Math.max(1, daysPassed);

            // Update the billing cycle with the prorated charge
            const updateBillingCycleQuery = `
                UPDATE billing_cycle
                SET 
                    total_charge = $1,
                    end_date = CURRENT_DATE
                WHERE 
                    subscription_id = $2
                  AND status = 'unpaid';
            `;
            const updateBillingCycleResult = await client.query(updateBillingCycleQuery, [proratedCharge, subscriptionId]);

            // Commit transaction
            await client.query('COMMIT');
            await client.query('END'); // End transaction

            return NextResponse.json(
                {
                    success: true,
                    message: 'Subscription canceled and billing cycle charges updated.',
                    data: {
                        proratedCharge,
                        canceledSubscriptions: cancelSubscriptionResult.rowCount,
                        updatedBillingCycles: updateBillingCycleResult.rowCount
                    }
                },
                { status: 200 }
            );
        } catch (error) {
            // Rollback transaction on error
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: 'Transaction failed: ' + error.message },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in API route:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
