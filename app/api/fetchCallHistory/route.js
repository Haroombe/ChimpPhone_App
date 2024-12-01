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
                DATE(l.start_time) AS call_date, -- Group by the date of the call
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'from_phone_number', l.from_phone_number,
                        'to_number', l.to_number,
                        'call_type', l.call_type,
                        'start_time', l.start_time,
                        'end_time', l.end_time,
                        'duration', l.duration,
                        'total_cost', l.total_cost
                    )
                ) AS calls
            FROM customer c
            JOIN phone_number_list n ON c.customer_id = n.customer_id
            JOIN call_log l ON n.phone_number = l.from_phone_number
            JOIN subscription s ON c.customer_id = s.customer_id
            JOIN billing_cycle b ON s.subscription_id = b.subscription_id
            WHERE c.customer_id = $1
            GROUP BY call_date
            ORDER BY call_date DESC
            LIMIT 25;`, // Group by and sort by call_date
            [customerid]
        );

        return NextResponse.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error call history info:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}