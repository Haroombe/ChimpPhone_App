const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const Route = require('./TableRelate/Dummy');

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', Route);

const pool = new Pool({
    user: 'ruuby',
    host: 'localhost',
    database: 'Chimpphone',
    password: 'Ruby0909@',
    port: 5432,
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dev_index.html'));
});

// Create Table
app.post('/createtables', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Customer Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS customer (
                customer_id SERIAL PRIMARY KEY,
                user_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_time TIMESTAMP DEFAULT NOW()
            );
        `);

        // Phone Plans Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS phone_plans (
                plan_id SERIAL PRIMARY KEY,
                plan_name VARCHAR(50) NOT NULL,
                rate_per_MBs DECIMAL(10, 2) NOT NULL,
                rate_per_minute DECIMAL(10, 2) NOT NULL,
                plan_type VARCHAR(10) CHECK (plan_type IN ('postpaid', 'prepaid'))
            );
        `);

        // Subscription Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS subscription (
                subscription_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES Customer(customer_id) ON DELETE CASCADE,
                plan_id INT REFERENCES phone_plans(plan_id) ON DELETE CASCADE,
                start_date DATE NOT NULL,
                end_date DATE,
                prepaid_balance DECIMAL(10, 2) DEFAULT 0,
                auto_renew BOOLEAN DEFAULT FALSE,
                UNIQUE (customer_id, plan_id, start_date)
            );
        `);

        // Call Log Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS call_log (
                call_id SERIAL PRIMARY KEY,
                subscription_id INT REFERENCES subscription(subscription_id) ON DELETE CASCADE,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                duration INT NOT NULL,
                cost DECIMAL(10, 2) NOT NULL,
                called_number VARCHAR(20) NOT NULL,
                out_of_country BOOLEAN DEFAULT FALSE,
                UNIQUE (call_id, subscription_id)
            );
        `);

        // Data Session Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS data_session (
                session_id SERIAL PRIMARY KEY,
                subscription_id INT REFERENCES subscription(subscription_id) ON DELETE CASCADE,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                data_used_mb DECIMAL(10, 2) NOT NULL,
                cost DECIMAL(10, 2) NOT NULL,
                UNIQUE (session_id, subscription_id)
            );
        `);

        // Billing Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS billing (
                billing_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES Customer(customer_id) ON DELETE CASCADE,
                month DATE NOT NULL,
                due_date DATE NOT NULL,
                total_calls INT DEFAULT 0,
                total_data DECIMAL(10, 2) DEFAULT 0,
                total_due DECIMAL(10, 2) DEFAULT 0,
                is_paid BOOLEAN DEFAULT FALSE,
                UNIQUE (customer_id, month)
            );
        `);

        // Bank Account Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS bank_account (
                bank_account_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES Customer(customer_id) ON DELETE CASCADE,
                card_number VARCHAR(16) NOT NULL,
                name VARCHAR(100) NOT NULL,
                exp_date DATE NOT NULL,
                cvv CHAR(3) NOT NULL,
                balance DECIMAL(10, 2) DEFAULT 0,
                UNIQUE (customer_id, card_number)
            );
        `);

        // Company Bank Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS company_bank (
                bank_account_id SERIAL PRIMARY KEY,
                account_name VARCHAR(100) NOT NULL,
                account_number VARCHAR(20) UNIQUE NOT NULL,
                routing_number VARCHAR(20) NOT NULL,
                balance DECIMAL(15, 2) DEFAULT 0
            );
        `);

        // Transaction Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS transaction (
                transaction_id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES Customer(customer_id) ON DELETE CASCADE,
                amount DECIMAL(10, 2) NOT NULL,
                transaction_date TIMESTAMP DEFAULT NOW(),
                transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('prepaid', 'postpaid')),
                payment_method VARCHAR(50),
                billing_id INT REFERENCES billing(billing_id) ON DELETE SET NULL,
                notes VARCHAR(255)
            );
        `);

        await client.query('COMMIT');
        res.status(201).json({ message: 'Tables created successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Fetch customer
app.get('/customer', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Customer;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.sendStatus(500);
    }
});

// Fetch Call history
app.get('/calls', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM call_log;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching call history:', error);
        res.sendStatus(500);
    }
});

// Fetch Subs
app.get('/subscription', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM subscription;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.sendStatus(500);
    }
});

// Fetch Billing
app.get('/postpaid', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM billing;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching billing:', error);
        res.sendStatus(500);
    }
});

// Fetch Bank Account
app.get('/bank', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bank_account;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching Bank Account:', error);
        res.sendStatus(500);
    }
});

// Fetch Bank Account
app.get('/transaction', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transaction;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.sendStatus(500);
    }
});


//Add a new customer (gonna treat this like a transaction)
app.post('/customer', async(req, res) =>{
    const {userID, email, password, plan1, plan2, Card_number, Card_name, EXP, CVV } = req.body;
    const client = await pool.connect(); 
    try {
        await client.query('BEGIN'); // Start transaction

        // Insert customer data and get new id of it
        const result = await client.query(
            `INSERT INTO customer (user_name, email, password) VALUES ($1, $2, $3) RETURNING customer_id`,
            [userID, email, password]
        );
        const newCustomerId = result.rows[0].customer_id;

        // Prepaid or Postpaid insert subscriptions
        if (plan1) {
            await client.query(
                'INSERT INTO subscription (customer_id, plan_id, start_date, end_date, prepaid_balance, auto_renew) VALUES ($1, $2, CURRENT_DATE, NULL, 0, FALSE);',
                [newCustomerId, 1]
            );
        }
        if (plan2) {
            await client.query(
                'INSERT INTO subscription (customer_id, plan_id, start_date, end_date, prepaid_balance, auto_renew) VALUES ($1, $2, CURRENT_DATE, NULL, 0, TRUE);',
                [newCustomerId, 2]
            );
        }

        await client.query(`
                INSERT INTO bank_account (customer_id, 
                card_number, name, exp_date, cvv, balance)VALUES ($1, $2, $3, $4, $5, $6);`,
                [newCustomerId, Card_number, Card_name, EXP, CVV, 100]);
        await client.query('COMMIT'); // Commit transaction if all queries succeed
        res.status(201).json({ message: 'Customer added successfully', customerId: newCustomerId });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error inserting customer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

//update customer
app.put('/customer/:userID', async(req, res) =>{
    const { userID} = req.params;
    const { email, password} = req.body;
    try {
        // update customer data 
        const result = await pool.query(
            'UPDATE customer SET email = $1, password = $2 WHERE customer_id = $3',
            [email, password, userID]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully' });

    } catch (error) {
        console.error('Error updating customer:', error);
        
        if (!res.headersSent) {
            res.status(500).json({ message: 'Failed to update customer' });
        }
    }
});

/*delete customer
app.delete('/customer/:customr_id', async(req, res) =>{
    const { customer_id} = req.params;
    try {
        // update customer data 
        await pool.query(
            'DELETE FROM Customer WHERE customer_id = $1',
            [customer_id]
        );
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.sendStatus(500);
    } 
});*/

app.post('/calls', async (req, res) => {
    const { userID, called_number, startTime, endTime, TotalTime } = req.body;
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Get subscription plan details
        const subscriptionResult = await client.query(
            `SELECT s.subscription_id, p.plan_id, p.plan_type, p.rate_per_minute, s.prepaid_balance
             FROM subscription s
             JOIN phone_plans p ON s.plan_id = p.plan_id
             WHERE s.customer_id = $1 AND s.start_date <= $2
             AND (s.end_date IS NULL OR s.end_date >= $2)
             LIMIT 1`,
            [userID, startTime]
        );

        if (subscriptionResult.rowCount === 0) {
            throw new Error("No active subscription found for the customer ID and date.");
        }

        const { subscription_id, rate_per_minute, plan_type, prepaid_balance } = subscriptionResult.rows[0];

        // Calculate the cost
        const cost = TotalTime * rate_per_minute;

        // Insert the call record into call_log
        await client.query(
            `INSERT INTO call_log (call_id, subscription_id, start_time, end_time, duration, cost, called_number, out_of_country)
            VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT) RETURNING call_id`,
            [subscription_id, startTime, endTime, TotalTime, cost, called_number]
        );

        // Update Billing and Subscription
        if (plan_type === 'post-paid') {
            // For postpaid, update billing table
            // Check if a billing record exists
            const month = startTime.slice(0, 7); // Extract YYYY-MM for the month
            const billingResult = await client.query(
                `SELECT billing_id, total_calls, total_data, total_due
                FROM billing
                WHERE customer_id = $1 AND month = $2`,
                [userID, month]
            );

            if (billingResult.rowCount > 0) {
                // Update existing billing record
                const { billing_id, total_calls, total_due } = billingResult.rows[0];
                await client.query(
                    `UPDATE billing
                     SET total_calls = $1, total_due = $2
                     WHERE billing_id = $3`,
                    [total_calls + 1, total_due + cost, billing_id]
                );
            } else {
                // Insert a new billing record for the month
                await client.query(
                    `INSERT INTO billing (billing_id, customer_id, month, total_calls, total_data, total_due)
                     VALUES (DEFAULT, $1, $2, $3, 0, $4)`,
                    [userID, month, 1, cost]
                );
            }
        } else if (plan_type === 'prepaid') {
            //For prepaid, update prepaid balance
            if (prepaid_balance < cost) {
                throw new Error("Insufficient prepaid balance for the call.");
            }
            await client.query(
                `UPDATE subscription
                 SET prepaid_balance = prepaid_balance - $1
                 WHERE subscription_id = $2`,
                [cost, subscription_id]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Call added successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing call:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});
/*
app.delete('/Call/:Call_ID', async (req, res) => {
    const {Call_ID} = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Get subscription plan details
        const subscriptionResult = await client.query(
            `SELECT c.subcription_id, p.plan_type, c.cost, s.customer_id, c.start_time
             FROM call_log c
             JOIN subscription s ON c.subscription_id = s.subscription_id
             JOIN phone_plans p ON s.plan_id = p.plan_id
             WHERE c.call_id = $1 AND s.start_date <= c.start_time
             AND (s.end_date IS NULL OR s.end_date >= c.end_time)
             LIMIT 1`,
            [Call_ID]
        );
        if (subscriptionResult.rowCount === 0) {
            throw new Error("No subscription found for the call ID.");
        }

        const { subcription_id, plan_type, cost, customer_id, start_time} = subscriptionResult.rows[0];

        // Delete the call record
        await client.query(
            `DELETE FROM call_log WHERE call_id = $1`,
            [Call_ID]
        );

    // Update Billing and Subscription
    if (plan_type === 'post-paid') {
        // For postpaid, update billing table
        // Check if a billing record exists
        const month = start_time.slice(0, 7); // Extract YYYY-MM for the month
        const billingResult = await client.query(
            `SELECT billing_id, total_calls, total_data, total_due
             FROM billing
             WHERE customer_id = $1 AND month = $2`,
            [customer_id, month]
        );

        if (billingResult.rowCount === 0) {
            throw new Error("No billing was found the call.");
        }

        if (billingResult.rowCount > 0) {
            // Update existing billing record
            const { billing_id, total_calls, total_due } = billingResult.rows[0];
            await client.query(
                `UPDATE billing
                 SET total_calls = $1, total_due = $2
                 WHERE billing_id = $3`,
                [total_calls - 1, total_due - cost, billing_id]
            );
        }
        } else if (plan_type === 'prepaid') {
            //For prepaid, update prepaid balance
            await client.query(
                `UPDATE subscription
                SET prepaid_balance = prepaid_balance + $1
                WHERE subcription_id = $2`,
                [cost, subcription_id]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Call deleted successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing call:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});*/

// For postpaid payment
app.post('/postpaid/:Customer_ID', async (req, res) => {
    const {Customer_ID} = req.params;
    const {Month, Card_number, Card_name, EXP, CVV } = req.body;
    //frontend type in as YYYY-MM
    const formattedMonth = `${Month}-01`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Get subscription plan details
        const BankResult = await client.query(
            `SELECT b.billing_id, a.bank_account_id, b.total_due, a.balance
            FROM billing b
            JOIN bank_account a ON b.customer_id = a.customer_id
            WHERE b.customer_id = $1 
            AND b.month = $2
            AND a.card_number = $3 
            AND a.name = $4
            AND a.exp_date = $5 
            AND a.cvv = $6;`,
            [Customer_ID, formattedMonth, Card_number, Card_name, EXP, CVV]
        );
        // Check billing existed and card information
        if (BankResult.rowCount === 0) {
            throw new Error("Billing not found or Invalid card information.");
        }

        const { billing_id, bank_account_id,total_due, balance} = BankResult.rows[0];

        // Check how broke they are
        if (balance < total_due ) {
            throw new Error("No sufficient card balance");
        }

        // Update Billing, Bank account, transaction tables
        await client.query(
            `UPDATE Bank_Account SET balance = balance - $1
            WHERE bank_account_id = $2`, 
            [total_due, bank_account_id]);

        await client.query(
            `UPDATE billing SET is_paid = TRUE WHERE billing_id = $1`,[billing_id]);
        
        await client.query(
            `INSERT INTO transaction (customer_id, amount, transaction_type, payment_method, billing_id)
            VALUES ($1, $2, 'postpaid', 'card', $3)`,
            [Customer_ID, total_due, billing_id]
        );
        await client.query('COMMIT');
        res.status(201).json({ message: 'Payment processed successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing payment:', error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

// For prepaid charge
app.post('/prepaid/:Customer_ID', async (req, res) => {
    const {Customer_ID} = req.params;
    const {amount, Card_number, Card_name, EXP, CVV } = req.body;
    // Converts to "YYYY-MM-DD"
    const CURRENT_DATE = new Date().toISOString().split('T')[0]; 
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Get bank details
        const BankResult = await client.query(
            `SELECT s.subscription_id, b.bank_account_id, b.balance
            FROM subscription s
            JOIN bank_account b ON s.customer_id = b.customer_id
            WHERE s.customer_id = $1
            AND s.start_date <= $2
            AND (s.end_date IS NULL OR s.end_date >= $2)
            AND b.card_number = $3
            AND b.name = $4
            AND b.exp_date = $5
            AND b.cvv = $6;`,
            [Customer_ID, CURRENT_DATE, Card_number, Card_name, EXP, CVV]
        );
        // Check subs existed and card information
        if (BankResult.rowCount === 0) {
            throw new Error("Active subscription not found or Invalid card information");
        }
        const { subscription_id, bank_account_id, balance} = BankResult.rows[0];
        // Check how broke they are
        if (balance < amount) {
            throw new Error("Insufficient card balance for prepaid");
        }

        // Update Subscription and Bank account
        await client.query(
            `UPDATE bank_account SET balance = balance - $1 WHERE bank_account_id = $2`,
            [amount, bank_account_id]
        );
        await client.query(
            `UPDATE subscription SET prepaid_balance = prepaid_balance + $1 WHERE subscription_id = $2`,
            [amount, subscription_id]
        );
        await client.query(
            `INSERT INTO transaction (customer_id, amount, transaction_type, payment_method)
             VALUES ($1, $2, 'prepaid', 'card')`,
            [Customer_ID, amount]
        );
            
        await client.query('COMMIT');
        res.status(201).json({ message: 'Payment processed successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing payment:', error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

app.listen(5501, () => {
    console.log("Server is running on port 5501");
});