import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch billing cycle data for simple table
        const fetchBillingCyclesQuery = `
            SELECT 
                subscription_id,
                billing_date,
                start_date,
                end_date,
                subscription_charge,
                call_charge,
                sms_charge,
                data_charge,
                tax,
                total_charge,
                status
            FROM billing_cycle
            ORDER BY billing_date DESC;
        `;

        const result = await pool.query(fetchBillingCyclesQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching billing cycles:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch billing cycles. Internal Server Error.' },
            { status: 500 }
        );
    }
}
