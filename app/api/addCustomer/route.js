import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function POST(req) {
    try {
        const body = await req.json();

        // Required fields from the request body
        const { first_name, last_name, email, phone_plan_id, start_date } = body;

        if (!first_name || !last_name || !email || !phone_plan_id || !start_date) {
            return NextResponse.json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Helper function: Generate a random US phone number
        const generateUSPhoneNumber = () => {
            const areaCode = Math.floor(200 + Math.random() * 800); // Random 3-digit area code (200-999)
            const prefix = Math.floor(200 + Math.random() * 800); // Random 3-digit prefix (200-999)
            const lineNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit line number (1000-9999)
            return `${areaCode}-${prefix}-${lineNumber}`;
        };

        // Helper function: Generate a random bank account number
        const generateBankAccountNumber = () => {
            return String(Math.floor(100000000000 + Math.random() * 900000000000)); // Random 12-digit number
        };

        // Helper function: Generate a random routing number
        const generateRoutingNumber = () => {
            return String(Math.floor(100000000 + Math.random() * 900000000)); // Random 9-digit number
        };

        // Start a transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Step 1: Insert the new customer
            const insertCustomerQuery = `
                INSERT INTO customer (first_name, last_name, email, created_time)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
                RETURNING customer_id;
            `;
            const customerResult = await client.query(insertCustomerQuery, [
                first_name,
                last_name,
                email,
            ]);
            const customer_id = customerResult.rows[0].customer_id;

            // Step 2: Add the subscription for the customer
            const addSubscriptionQuery = `
                INSERT INTO subscription (customer_id, plan_id, start_date, end_date, active)
                VALUES ($1, $2, $3, $4, TRUE)
                RETURNING subscription_id;
            `;
            const subscriptionEndDate = new Date(start_date);
            subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30); // 30 days from start_date
            const subscriptionResult = await client.query(addSubscriptionQuery, [
                customer_id,
                phone_plan_id,
                start_date,
                subscriptionEndDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
            ]);
            const subscription_id = subscriptionResult.rows[0].subscription_id;

            // Step 3: Generate a random US phone number and insert into phone_number_list
            const phoneNumber = generateUSPhoneNumber();
            const addPhoneNumberQuery = `
                INSERT INTO phone_number_list (phone_number, customer_id, is_primary, added_date)
                VALUES ($1, $2, TRUE, CURRENT_DATE);
            `;
            await client.query(addPhoneNumberQuery, [phoneNumber, customer_id]);

            // Step 4: Generate a random bank account and insert into company_bank
            const bankAccountNumber = generateBankAccountNumber();
            const routingNumber = generateRoutingNumber();
            const addBankAccountQuery = `
                INSERT INTO bank_account (customer_id, card_number, name, exp_date, cvv, balance, default_flag)
                VALUES ($1, $2, $3, $4, $5, $6, TRUE);
            `;
            const bankName = `${first_name} ${last_name}`; // Use customer's name as the account holder's name
            const expDate = new Date();
            expDate.setFullYear(expDate.getFullYear() + 3); // Expiry date = 3 years from now
            const cvv = Math.floor(100 + Math.random() * 900); // Random 3-digit CVV
            const initialBalance = 1000; // Example initial balance

            await client.query(addBankAccountQuery, [
                customer_id,
                bankAccountNumber,
                bankName,
                expDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
                String(cvv),
                initialBalance,
            ]);

            // Step 5: Insert a billing cycle for the customer
            const billingDate = new Date(start_date);
            billingDate.setDate(billingDate.getDate() + 31); // 31 days from start_date
            const addBillingCycleQuery = `
                INSERT INTO billing_cycle (
                    subscription_id, billing_date, start_date, end_date,
                    subscription_charge, call_charge, sms_charge, data_charge,
                    tax, total_charge, status
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
            `;
            const subscriptionCharge = 50; // Example charge
            const callCharge = 0; // No calls yet
            const smsCharge = 0; // No SMS yet
            const dataCharge = 0; // No data usage yet
            const tax = 5; // Example tax
            const totalCharge = subscriptionCharge + callCharge + smsCharge + dataCharge + tax;

            await client.query(addBillingCycleQuery, [
                subscription_id,
                billingDate.toISOString().split('T')[0],
                start_date,
                subscriptionEndDate.toISOString().split('T')[0],
                subscriptionCharge,
                callCharge,
                smsCharge,
                dataCharge,
                tax,
                totalCharge,
                'unpaid', // Initial status is unpaid
            ]);

            // Commit the transaction
            await client.query('COMMIT');
            // End the transaction
            await client.query('END');

            return NextResponse.json({
                success: true,
                message: 'Customer, subscription, phone number, bank account, and billing cycle added successfully.',
                data: { customer_id, phone_number: phoneNumber, bank_account: bankAccountNumber },
            });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error.message);
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error adding new customer:', error.message);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
