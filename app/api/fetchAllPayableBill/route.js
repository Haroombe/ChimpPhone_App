import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const query = `
            SELECT DISTINCT
                c.customer_id,
                c.first_name,
                c.last_name,
                bc.subscription_id,
                bc.start_date,
                bc.status
            FROM
                customer c
            INNER JOIN
                subscription s ON c.customer_id = s.customer_id
            INNER JOIN
                billing_cycle bc ON s.subscription_id = bc.subscription_id
            WHERE
                bc.status IN ('unpaid', 'overdue')
            ORDER BY
                c.first_name, c.last_name;
        `;

        const result = await pool.query(query);
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching customers with unpaid bills:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
