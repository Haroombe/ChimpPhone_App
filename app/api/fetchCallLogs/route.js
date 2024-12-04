import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Fetch call log data from the database
        const fetchCallLogQuery = `
            SELECT 
                call_id, from_phone_number, to_number, start_time, end_time, duration, call_type, total_cost
            FROM call_log
            ORDER BY start_time DESC;
        `;

        const result = await pool.query(fetchCallLogQuery);
        //console.log(result);
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching call logs:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
