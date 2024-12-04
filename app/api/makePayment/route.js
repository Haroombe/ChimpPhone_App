import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the request body
        const { customer_id, subscription_id, start_date, company_bank_account_id } = await req.json();

        // Validate input
        if (!customer_id || !subscription_id || !start_date || !company_bank_account_id) {
            return NextResponse.json(
                { success: false, error: 'customer_id, subscription_id, start_date, and company_bank_account_id are required.' },
                { status: 400 }
            );
        }

        // Connect to the database
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction

            // Get the customer's default bank account
            const getDefaultBankAccountQuery = `
                SELECT bank_account_id, balance
                FROM bank_account
                WHERE customer_id = $1 AND default_flag = TRUE
                LIMIT 1;
            `;
            const defaultBankResult = await client.query(getDefaultBankAccountQuery, [customer_id]);

            if (defaultBankResult.rowCount === 0) {
                throw new Error('No default bank account found for the customer.');
            }

            const { bank_account_id, balance } = defaultBankResult.rows[0];

            // Retrieve the specific unpaid billing cycle using the composite key
            const getBillingCycleQuery = `
                SELECT bc.total_charge, bc.status
                FROM billing_cycle bc
                WHERE bc.subscription_id = $1 AND bc.start_date = $2 
                AND (bc.status = 'unpaid' OR bc.status = 'overdue')
                LIMIT 1;
            `;
            const billingResult = await client.query(getBillingCycleQuery, [subscription_id, start_date]);

            if (billingResult.rowCount === 0) {
                throw new Error('No unpaid billing cycle found for the provided subscription_id and start_date.');
            }

            const { total_charge } = billingResult.rows[0];
            //console.log("Customer Default Bank Account Balance:", balance);
            //console.log("Billing Cycle Total Charge:", total_charge);

            // Ensure both are numbers before comparison
            const balanceNumber = parseFloat(balance);
            const totalChargeNumber = parseFloat(total_charge);

            //console.log("Parsed Balance:", balanceNumber);
            //console.log("Parsed Total Charge:", totalChargeNumber);

            if (totalChargeNumber > balanceNumber) {
                throw new Error('Insufficient funds in the default bank account.');
            }

            // Deduct the amount from the customer's default bank account
            const updateBankBalanceQuery = `
                UPDATE bank_account
                SET balance = balance - $1
                WHERE bank_account_id = $2;
            `;
            await client.query(updateBankBalanceQuery, [total_charge, bank_account_id]);

            // Credit the company's bank account
            const updateCompanyBankQuery = `
                UPDATE company_bank
                SET balance = balance + $1
                WHERE bank_account_id = $2;
            `;
            await client.query(updateCompanyBankQuery, [total_charge, company_bank_account_id]);

            // Update the specific billing cycle status to "paid"
            const updateBillingCycleQuery = `
                UPDATE billing_cycle
                SET status = 'paid'
                WHERE subscription_id = $1 AND start_date = $2;
            `;
            await client.query(updateBillingCycleQuery, [subscription_id, start_date]);

            // Insert the payment into the transaction table
            const insertTransactionQuery = `
                INSERT INTO transaction (customer_id, amount, transaction_date, transaction_type)
                VALUES ($1, $2, CURRENT_TIMESTAMP, 'payment');
            `;
            await client.query(insertTransactionQuery, [customer_id, total_charge]);

            await client.query('COMMIT'); // Commit transaction
            await client.query('END'); // END transaction

            return NextResponse.json(
                { success: true, message: 'Payment successful, billing cycle updated' },
                { status: 200 }
            );
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback on error
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
