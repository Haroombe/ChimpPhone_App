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
        // Fetch all phone number for the customer
        const phoneResult = await pool.query(
            `SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;`,
            [customerid]
        );

        if (phoneResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No phone numbers found for the customer.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: phoneResult.rows });
    } catch (error) {
        console.error('Error fetching phone number:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
