const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
    user: 'ruuby',
    host: 'localhost',
    database: 'chimpphone',
    password: 'Ruby0909@',
    port: 5432,
});

router.post('/Fill', async (req, res) => {
    const client = await pool.connect();
    try {
            await client.query('BEGIN');

            await client.query(`
                INSERT INTO Customer (user_name, email, password)
                VALUES 
                ('Alice Johnson', 'alice@example.com', 'password123'),
                ('Bob Smith', 'bob@example.com', 'password456'),
                ('Charlie Brown', 'charlie@example.com', 'password789'),
                ('Diana Prince', 'diana@example.com', 'password321'),
                ('Ethan Hunt', 'ethan@example.com', 'password654'),
                ('Fiona Apple', 'fiona@example.com', 'password987'),
                ('George Clooney', 'george@example.com', 'password246'),
                ('Hannah Baker', 'hannah@example.com', 'password135'),
                ('Ian McKellen', 'ian@example.com', 'password579'),
                ('Judy Garland', 'judy@example.com', 'password864')
                `);
            
            await client.query(`
                INSERT INTO phone_plans (plan_name, rate_per_MBs, rate_per_minute, plan_type)
                VALUES 
                ('Basic Prepaid', 0.10, 0.05, 'prepaid'),
                ('Basic Postpaid', 0.10, 0.03, 'postpaid'),
                ('Plus Prepaid', 0.08, 0.04, 'prepaid'),
                ('Business Plan', 0.07, 0.03, 'postpaid')`);

            await client.query(`
                INSERT INTO subscription (customer_id, plan_id, start_date, end_date, prepaid_balance, auto_renew)
                VALUES 
                (1, 1, '2023-01-01', '2026-03-31', 50.00, FALSE),  -- Prepaid
                (2, 2, '2023-01-01', '2023-06-01', NULL, TRUE),    -- Postpaid
                (3, 1, '2023-02-01', '2027-02-01', 25.00, TRUE),   -- Prepaid
                (4, 3, '2023-03-01', '2023-09-01', 40.00, TRUE),   -- Prepaid
                (5, 2, '2023-03-01', NULL, NULL, FALSE),           -- Postpaid
                (6, 2, '2023-04-01', '2023-10-01', NULL, TRUE),    -- Postpaid
                (7, 3, '2023-04-01', NULL, 15.00, TRUE),           -- Prepaid
                (8, 4, '2023-05-01', '2023-11-01', NULL, TRUE),    -- Postpaid
                (9, 4, '2023-06-01', NULL, NULL, FALSE),           -- Postpaid
                (10, 1, '2023-06-01', '2023-12-01', 20.00, TRUE);  -- Prepaid
                `);
            
            await client.query(`
                INSERT INTO call_log (subscription_id, start_time, end_time, duration, cost, called_number, out_of_country)
                VALUES 
                (1, '2023-03-01 10:00:00', '2023-03-01 10:05:00', 5, 0.25, '+441632960961', TRUE),
                (2, '2023-03-01 11:00:00', '2023-03-01 11:15:00', 15, 0.45, '+14155552671', FALSE),
                (3, '2023-03-02 09:30:00', '2023-03-02 09:45:00', 15, 0.75, '+493012345678', TRUE),
                (4, '2023-03-02 14:00:00', '2023-03-02 14:20:00', 20, 0.80, '+861012345678', TRUE),
                (5, '2023-03-03 12:00:00', '2023-03-03 12:10:00', 10, 0.50, '+14155559876', FALSE),
                (6, '2023-03-04 13:30:00', '2023-03-04 13:50:00', 20, 0.60, '+33123456789', TRUE),
                (7, '2023-03-05 15:00:00', '2023-03-05 15:30:00', 30, 0.90, '+5511987654321', TRUE),
                (8, '2023-03-06 09:00:00', '2023-03-06 09:10:00', 10, 0.30, '+14155553456', FALSE),
                (9, '2023-03-06 10:00:00', '2023-03-06 10:20:00', 20, 0.70, '+442071838750', TRUE),
                (10, '2023-03-07 11:30:00', '2023-03-07 11:45:00', 15, 0.75, '+81312345678', TRUE)
            `);


            await client.query(`
                INSERT INTO data_session (subscription_id, start_time, end_time, data_used_mb, cost)
                VALUES 
                (1, '2023-03-01 10:00:00', '2023-03-01 10:30:00', 100, 10.00),
                (2, '2023-03-01 11:00:00', '2023-03-01 11:30:00', 200, 0.00),
                (3, '2023-03-02 09:30:00', '2023-03-02 09:45:00', 50, 5.00),
                (4, '2023-03-03 14:00:00', '2023-03-03 14:20:00', 300, 0.00),
                (5, '2023-03-04 10:30:00', '2023-03-04 10:50:00', 150, 15.00),
                (6, '2023-03-05 08:30:00', '2023-03-05 08:45:00', 100, 0.00),
                (7, '2023-03-06 13:30:00', '2023-03-06 13:50:00', 250, 20.00),
                (8, '2023-03-07 10:00:00', '2023-03-07 10:20:00', 200, 10.00),
                (9, '2023-03-08 09:00:00', '2023-03-08 09:30:00', 500, 25.00),
                (10, '2023-03-09 11:30:00', '2023-03-09 11:45:00', 50, 5.00)
            `);

            await client.query(`
                INSERT INTO billing (customer_id, month, due_date, total_calls, total_data, total_due, is_paid)
                VALUES 
                (2, '2023-03-01', '2023-03-31', 2, 200, 0.45, TRUE),
                (5, '2023-04-01', '2023-04-30', 1, 150, 15.50, TRUE),
                (6, '2023-05-01', '2023-05-31', 2, 100, 0.90, FALSE),
                (8, '2023-06-01', '2023-06-30', 3, 200, 10.50, FALSE),
                (9, '2023-06-01', '2023-06-30', 2, 500, 25.50, TRUE)
            `);
            await client.query(`
                INSERT INTO bank_account (customer_id, card_number, name, exp_date, cvv, balance)
                VALUES 
                (1, '4532015112830366', 'Alice Johnson', '2024-12-31', '123', 500.00),
                (2, '6011514433546201', 'Bob Smith', '2025-06-30', '456', 300.00),
                (3, '4485923241376250', 'Charlie Brown', '2023-11-30', '789', 100.00),
                (4, '4929474643744130', 'Diana Prince', '2026-09-30', '321', 400.00),
                (5, '4539578763621486', 'Ethan Hunt', '2024-01-31', '654', 200.00),
                (6, '4916874839843708', 'Fiona Apple', '2025-08-31', '987', 150.00),
                (7, '4024007181846015', 'George Clooney', '2023-05-31', '246', 350.00),
                (8, '4716815726062276', 'Hannah Baker', '2024-04-30', '135', 250.00),
                (9, '4532887053452171', 'Ian McKellen', '2023-07-30', '579', 500.00),
                (10, '6011343446620217', 'Judy Garland', '2025-03-31', '864', 100.00)
            `);
            
            await client.query(`
                INSERT INTO company_bank (account_name, account_number, routing_number, balance)
                VALUES 
                ('chimpphone Corp', '555555555555', '123456789', 19400121313.00)`);

            await client.query(`
                INSERT INTO transaction (customer_id, amount, transaction_date, transaction_type, payment_method, billing_id)
                VALUES 
                (1, 15.25, '2023-03-31', 'postpaid', 'credit card', 1),
                (3, 20.00, '2023-04-01', 'prepaid', 'credit card', NULL)
            `);
            await client.query('COMMIT');
            res.status(201).json({ message: 'Tables filled successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error filling tables:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

router.delete('/delete', async (req, res) => {
    const client = await pool.connect();
    try {
            await client.query('BEGIN');

            await client.query(`DELETE FROM transaction;`);
            await client.query(`DELETE FROM call_log;`);
            await client.query(`DELETE FROM data_session;`);
            await client.query(`DELETE FROM billing;`);
            await client.query(`DELETE FROM bank_account;`);
            await client.query(`DELETE FROM subscription;`);
            await client.query(`DELETE FROM phone_plans;`);
            await client.query(`DELETE FROM Customer;`);
            await client.query(`DELETE FROM company_bank;`);
            await client.query('COMMIT');

            // Reset serial for pk
            await client.query(`ALTER SEQUENCE Customer_customer_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE phone_plans_plan_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE subscription_subscription_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE call_log_call_id_seq RESTART WITH 1;
            ALTER SEQUENCE data_session_session_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE billing_billing_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE bank_account_bank_account_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE company_bank_bank_account_id_seq RESTART WITH 1;`);

            await client.query(`ALTER SEQUENCE transaction_transaction_id_seq RESTART WITH 1;`);

            res.status(201).json({ message: 'Tables delete successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting tables:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});
module.exports = router;