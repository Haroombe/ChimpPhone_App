    // get current cycle bill
import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const customerid = searchParams.get('customerid');

    if (!customerid) {
        return NextResponse.json(
            { success: false, error: 'Customer ID is required.' },
            { status: 400 }
        );
    }

    try {
        const result = await pool.query(
            `SELECT 
                b.subscription_id,
                b.billing_date, 
                b.start_date, 
                b.end_date, 
                b.subscription_charge, 
                b.call_charge, 
                b.data_charge, 
                b.sms_charge, 
                b.tax, 
                b.total_charge, 
                b.status,
                p.plan_name,
                p.plan_type,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.monthly_charge,
                s.prepaid_balance
            FROM customer c
            JOIN subscription s ON c.customer_id = s.customer_id
            JOIN billing_cycle b ON s.subscription_id = b.subscription_id
            JOIN phone_plan p ON s.plan_id = p.plan_id
            WHERE c.customer_id = $1
            AND s.active = TRUE
            ORDER BY b.start_date DESC 
            LIMIT 1;
            `,
            [customerid]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No billing data found.' },
                { status: 404 }
            );
        }
        //console.log(result.rows);
        return NextResponse.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching billing info:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
