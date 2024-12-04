import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const query = `
            SELECT DISTINCT
                c.customer_id,
                c.first_name,
                c.last_name,
                pn.phone_number
            FROM
                customer c
            INNER JOIN
                phone_number_list pn ON c.customer_id = pn.customer_id
            INNER JOIN
                subscription s ON c.customer_id = s.customer_id
            WHERE
                s.active = TRUE AND pn.is_primary = TRUE
            ORDER BY
                c.first_name, c.last_name;
        `;

        const result = await pool.query(query);
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching active customers and phone numbers:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
