import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Parse query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const customer_id = searchParams.get('customerid');

        // Validate the customer_id
        if (!customer_id) {
            return NextResponse.json(
                { success: false, error: 'customer_id is required.' },
                { status: 400 }
            );
        }

        // Connect to the database
        const client = await pool.connect();
        try {
            // fetch total due and billing periods for unpaid and overdue bills excluding the current cycle
            const query = `
                SELECT 
                    bc.subscription_id,
                    bc.start_date,
                    bc.end_date,
                    bc.total_charge
                FROM billing_cycle bc
                INNER JOIN subscription s ON bc.subscription_id = s.subscription_id
                WHERE s.customer_id = $1 
                  AND bc.status IN ('overdue', 'unpaid')
                  AND bc.end_date < CURRENT_DATE -- Exclude the current cycle
                ORDER BY bc.start_date ASC;
            `;

            const result = await client.query(query, [customer_id]);

            // Calculate total due
            const total_due = result.rows.reduce((sum, bill) => sum + parseFloat(bill.total_charge), 0);

            return NextResponse.json(
                {
                    success: true,
                    data: {
                        total_due: total_due.toFixed(2),
                        unpaid_bills: result.rows.map((bill) => ({
                            subscription_id: bill.subscription_id,
                            start_date: bill.start_date,
                            end_date: bill.end_date,
                            total_charge: parseFloat(bill.total_charge).toFixed(2),
                        })),
                    },
                },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error fetching unpaid bills:', error.message);
            return NextResponse.json(
                { success: false, error: error.message || 'Internal server error.' },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in API route:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
