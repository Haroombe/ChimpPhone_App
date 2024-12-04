import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Query to fetch bank account records for tablle
        const fetchBankAccountsQuery = `
            SELECT 
                bank_account_id,
                customer_id,
                card_number,
                name,
                exp_date,
                cvv,
                balance,
                default_flag
            FROM bank_account
            ORDER BY bank_account_id ASC;
        `;

        const result = await pool.query(fetchBankAccountsQuery);

        return NextResponse.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Error fetching bank accounts:', error.message);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch bank accounts. Internal Server Error.' },
            { status: 500 }
        );
    }
}
