import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch call transit logs
        const fetchCallTransitsQuery = `
            SELECT 
                transit_id,
                call_id,
                from_area,
                to_area,
                transit_time
            FROM call_transit
            ORDER BY transit_time DESC;
        `;

        const result = await pool.query(fetchCallTransitsQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching call transits:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch call transits. Internal Server Error.' },
            { status: 500 }
        );
    }
}
