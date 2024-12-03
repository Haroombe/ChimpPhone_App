import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Parse the query parameter from the request URL
        const { searchParams } = new URL(req.url);
        const customer_id = searchParams.get('customerid');

        // Validate the customer_id
        if (!customer_id) {
            return NextResponse.json(
                { success: false, error: 'customer_id is required.' },
                { status: 400 }
            );
        }

        // Connect to the database
        const client = await pool.connect();
        try {
            // Fetch the 25 most recent transactions for the given customer_id
            const query = `
                SELECT transaction_id, customer_id, amount, transaction_date, transaction_type
                FROM transaction
                WHERE customer_id = $1
                ORDER BY transaction_date DESC
                LIMIT 25;
            `;
            const result = await client.query(query, [customer_id]);

            // Return the transactions
            return NextResponse.json(
                {
                    success: true,
                    data: result.rows,
                },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
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
