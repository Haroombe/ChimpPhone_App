import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse request body
        const { customer_id, email_advertise_agree } = await req.json();

        // Validate input
        if (customer_id === undefined || email_advertise_agree === undefined) {
            return NextResponse.json(
                { success: false, error: 'Both customer_id and email_advertise_agree are required.' },
                { status: 400 }
            );
        }

        // Validate that email_advertise_agree is a boolean
        if (typeof email_advertise_agree !== 'boolean') {
            return NextResponse.json(
                { success: false, error: 'email_advertise_agree must be a boolean value.' },
                { status: 400 }
            );
        }

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Update the email_advertise_agree field for the given customer_id
            const updateQuery = `
                UPDATE customer
                SET email_advertise_agree = $1
                WHERE customer_id = $2;
            `;
            const result = await client.query(updateQuery, [email_advertise_agree, customer_id]);

            if (result.rowCount === 0) {
                throw new Error('Customer not found.');
            }

            await client.query('COMMIT'); // Commit transaction
            await client.query('END');// END transaction
            return NextResponse.json(
                { success: true, message: 'Email advertise agreement updated successfully.' },
                { status: 200 }
            );
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback transaction on error
            console.error('Transaction failed:', error.message);
            return NextResponse.json(
                { success: false, error: error.message || 'Internal server error.' },
                { status: 500 }
            );
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error in API route:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
