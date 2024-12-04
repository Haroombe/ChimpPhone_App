import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch data usage records for simple table
        const fetchDataUsageQuery = `
            SELECT 
                phone_number,
                month,
                data_used,
                cost
            FROM data_usage
            ORDER BY month DESC;
        `;

        const result = await pool.query(fetchDataUsageQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching data usage:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch data usage. Internal Server Error.' },
            { status: 500 }
        );
    }
}
