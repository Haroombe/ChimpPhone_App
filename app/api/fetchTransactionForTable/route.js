import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        // Query to fetch transaction records for table
        const fetchTransactionsQuery = `
            SELECT 
                transaction_id,
                customer_id,
                amount,
                transaction_date,
                transaction_type
            FROM transaction
            ORDER BY transaction_date DESC;
        `;

        const result = await pool.query(fetchTransactionsQuery);
        //console.log(result);
        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch transactions. Internal Server Error.' },
            { status: 500 }
        );
    }
}
