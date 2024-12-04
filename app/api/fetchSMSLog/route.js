import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Fetch SMS logs from the `sms_log` table
        const fetchSmsLogsQuery = `
            SELECT 
                phone_number,
                to_number,
                time,
                char_count,
                country_code,
                roaming_cost,
                total_cost
            FROM sms_log
            ORDER BY time DESC;
        `;

        const result = await pool.query(fetchSmsLogsQuery);

        // Format and return the data
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching SMS logs:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch SMS logs. Internal Server Error.' },
            { status: 500 }
        );
    }
}
