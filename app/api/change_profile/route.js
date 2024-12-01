import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse request body
        const { customer_id, first_name, last_name, email, phone_number } = await req.json();

        // Validate input
        if (!customer_id || !first_name || !last_name || !email || !phone_number) {
            return NextResponse.json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Update customer details
            const updateCustomerQuery = `
                UPDATE customer
                SET first_name = $1, last_name = $2, email = $3
                WHERE customer_id = $4;
            `;
            const customerResult = await client.query(updateCustomerQuery, [
                first_name,
                last_name,
                email,
                customer_id,
            ]);

            if (customerResult.rowCount === 0) {
                throw new Error('Customer not found.');
            }

            // Update primary phone number
            const updatePhoneNumberQuery = `
                UPDATE phone_number_list
                SET phone_number = $1
                WHERE customer_id = $2 AND is_primary = TRUE;
            `;
            const phoneResult = await client.query(updatePhoneNumberQuery, [phone_number, customer_id]);

            if (phoneResult.rowCount === 0) {
                throw new Error('Primary phone number not found.');
            }

            await client.query('COMMIT'); // Commit transaction

            return NextResponse.json(
                { success: true, message: 'Customer profile updated successfully.' },
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
