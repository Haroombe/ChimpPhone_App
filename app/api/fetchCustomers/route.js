import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch customer records
        const fetchCustomersQuery = `
            SELECT 
                customer_id,
                first_name,
                last_name,
                email,
                date_of_birth,
                zip_code,
                created_time
            FROM customer
            ORDER BY created_time DESC;
        `;

        const result = await pool.query(fetchCustomersQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching customers:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch customers. Internal Server Error.' },
            { status: 500 }
        );
    }
}
