import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const customerid = searchParams.get('customerid');

    if (!customerid) {
        return NextResponse.json(
            { success: false, error: 'Customer ID is required.' },
            { status: 400 }
        );
    }

    try {
        // Fetch all bank accounts for the customer
        const bankAccountsResult = await pool.query(
            `SELECT 
                bank_account_id,
                card_number,
                name,
                default_flag
            FROM bank_account
            WHERE customer_id = $1;`,
            [customerid]
        );

        if (bankAccountsResult.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No bank accounts found for the customer.' },
                { status: 404 }
            );
        }

        // Find the default bank account
        const primaryBankAccount = bankAccountsResult.rows.find(account => account.default_flag) || null;

        // Return the bank accounts and primary bank account
        return NextResponse.json({
            success: true,
            data: {
                primary_bank_account: primaryBankAccount,
                bank_accounts: bankAccountsResult.rows
            }
        });
    } catch (error) {
        console.error('Error fetching bank account info:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
