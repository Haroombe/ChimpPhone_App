import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch international data usage records
        const fetchDataUsageQuery = `
            SELECT 
                phone_number,
                month,
                data_used,
                cost
            FROM international_data_usage
            ORDER BY month DESC;
        `;

        const result = await pool.query(fetchDataUsageQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching international data usage:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch international data usage. Internal Server Error.' },
            { status: 500 }
        );
    }
}
