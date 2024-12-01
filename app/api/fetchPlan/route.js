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
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 `, // Group by and sort by call_date
            [customerid]
        );

        return NextResponse.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error plan info:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}