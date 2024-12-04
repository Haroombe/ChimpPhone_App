import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { customer_id, phone_number, to_number, country_code } = await req.json();

        // Validate inputs
        if (!customer_id || !phone_number || !to_number) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: customer_id, phone_number, to_number.' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Check if the to_number is already in a call
            const checkBusyQuery = `
                SELECT 1
                FROM call_log
                WHERE to_number = $1 AND end_time IS NULL
                LIMIT 1;
            `;
            const busyResult = await client.query(checkBusyQuery, [to_number]);

            if (busyResult.rowCount > 0) {
                throw new Error('The destination number is currently busy.');
            }

            // Insert a new row into call_log with end_time as NULL
            const insertCallLogQuery = `
                INSERT INTO call_log (
                    from_phone_number, to_number, start_time, end_time, duration, call_type, roaming_cost, total_cost, country_code, area_id
                ) VALUES ($1, $2, CURRENT_TIMESTAMP, NULL, NULL, $3, 0, 0, $4, NULL)
                RETURNING call_id;
            `;
            const isInternational = country_code != null;
            const callType = isInternational ? 'international' : 'domestic';

            const insertResult = await client.query(insertCallLogQuery, [
                phone_number,
                to_number,
                callType,
                country_code,
            ]);

            const callId = insertResult.rows[0].call_id;

            await client.query('COMMIT');
            await client.query('END');
            
            return NextResponse.json({
                success: true,
                message: 'Call started successfully.',
                data: { callId },
            });
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback transaction
            console.error('Error starting call:', error.message);
            return NextResponse.json(
                { success: false, error: error.message || 'Internal server error.' },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in startCall API:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
