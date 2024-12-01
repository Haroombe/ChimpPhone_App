import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse request body
        const { customer_id, new_password } = await req.json();

        // Validate input
        if (!customer_id  || !new_password) {
            return NextResponse.json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Connect to the database
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Fetch the current password from the database
            const fetchPasswordQuery = `
                SELECT password 
                FROM customer 
                WHERE customer_id = $1;
            `;
            const result = await client.query(fetchPasswordQuery, [customer_id]);

            if (result.rowCount === 0) {
                throw new Error('Customer not found.');
            }

            const storedPassword = result.rows[0].password;

            /*Check if the current password matches
            if (storedPassword !== current_password) {
                return NextResponse.json(
                    { success: false, error: 'Current password is incorrect.' },
                    { status: 401 }
                );
            }
            */
            // Update the password in the database
            const updatePasswordQuery = `
                UPDATE customer
                SET password = $1
                WHERE customer_id = $2;
            `;
            await client.query(updatePasswordQuery, [new_password, customer_id]);

            await client.query('COMMIT');
            await client.query('END');

            return NextResponse.json(
                { success: true, message: 'Password updated successfully.' },
                { status: 200 }
            );
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating password:', error.message);
            return NextResponse.json(
                { success: false, error: 'Internal server error.' },
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
