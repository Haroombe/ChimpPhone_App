import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch phone number list records for table
        const fetchPhoneNumbersQuery = `
            SELECT 
                phone_number,
                customer_id,
                is_primary,
                added_date
            FROM phone_number_list
            ORDER BY added_date DESC;
        `;

        const result = await pool.query(fetchPhoneNumbersQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching phone numbers:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch phone numbers. Internal Server Error.' },
            { status: 500 }
        );
    }
}
