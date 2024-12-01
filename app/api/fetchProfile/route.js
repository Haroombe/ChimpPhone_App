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
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;`,
            [customerid]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No customer data found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching customer info:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
