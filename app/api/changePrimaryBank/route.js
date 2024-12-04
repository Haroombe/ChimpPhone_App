import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the request body
        const { customer_id, bank_account_id } = await req.json();

        // Validate input
        if (!customer_id || !bank_account_id) {
            return NextResponse.json(
                { success: false, error: 'Both customer_id and bank_account_id are required.' },
                { status: 400 }
            );
        }

        // Begin transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Validate the provided bank_account_id belongs to the customer
            const validateBankAccountQuery = `
                SELECT bank_account_id 
                FROM bank_account 
                WHERE customer_id = $1 AND bank_account_id = $2;
            `;
            const validateResult = await client.query(validateBankAccountQuery, [
                customer_id,
                bank_account_id,
            ]);

            if (validateResult.rowCount === 0) {
                throw new Error('The provided bank account does not belong to the customer.');
            }

            // Mark all bank accounts for the customer as non-primary
            const resetPrimaryQuery = `
                UPDATE bank_account
                SET default_flag = FALSE
                WHERE customer_id = $1;
            `;
            await client.query(resetPrimaryQuery, [customer_id]);

            // Set the provided bank account as primary
            const setPrimaryQuery = `
                UPDATE bank_account
                SET default_flag = TRUE
                WHERE bank_account_id = $1;
            `;
            const updateResult = await client.query(setPrimaryQuery, [bank_account_id]);

            if (updateResult.rowCount === 0) {
                throw new Error('Failed to update the primary bank account.');
            }

            await client.query('COMMIT'); // Commit transaction
            await client.query('END'); // End transaction
            
            return NextResponse.json(
                { success: true, message: 'Primary bank account updated successfully.' },
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
