import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch subscription records
        const fetchSubscriptionsQuery = `
            SELECT 
                subscription_id,
                customer_id,
                plan_id,
                start_date,
                end_date,
                active,
                prepaid_balance
            FROM subscription
            ORDER BY start_date DESC;
        `;

        const result = await pool.query(fetchSubscriptionsQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching subscriptions:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch subscriptions. Internal Server Error.' },
            { status: 500 }
        );
    }
}
