SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
BEGIN
BEGIN
BEGIN
BEGIN

                UPDATE subscription
                SET active = FALSE, 
                    end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE;
            

                UPDATE subscription
                SET active = FALSE, 
                    end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE;
            

                UPDATE billing_cycle
                SET 
                    end_date = CURRENT_DATE,
                    status = CASE 
                        WHEN CURRENT_DATE > end_date THEN 'overdue'
                        ELSE status
                    END
                WHERE subscription_id = (
                    SELECT subscription_id 
                    FROM subscription 
                    WHERE customer_id = $1 AND active = FALSE 
                    ORDER BY end_date DESC 
                    LIMIT 1
                );
            

                UPDATE subscription
                SET active = FALSE, 
                    end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE;
            

                UPDATE subscription
                SET active = FALSE, 
                    end_date = CURRENT_DATE
                WHERE customer_id = $1
                  AND active = TRUE;
            

                INSERT INTO subscription (customer_id, plan_id, start_date, active, promotion_id, prepaid_balance)
                VALUES ($1, $2, CURRENT_DATE, TRUE, $3, $4)
                RETURNING subscription_id;
            

                UPDATE billing_cycle
                SET 
                    end_date = CURRENT_DATE,
                    status = CASE 
                        WHEN CURRENT_DATE > end_date THEN 'overdue'
                        ELSE status
                    END
                WHERE subscription_id = (
                    SELECT subscription_id 
                    FROM subscription 
                    WHERE customer_id = $1 AND active = FALSE 
                    ORDER BY end_date DESC 
                    LIMIT 1
                );
            

                UPDATE billing_cycle
                SET 
                    end_date = CURRENT_DATE,
                    status = CASE 
                        WHEN CURRENT_DATE > end_date THEN 'overdue'
                        ELSE status
                    END
                WHERE subscription_id = (
                    SELECT subscription_id 
                    FROM subscription 
                    WHERE customer_id = $1 AND active = FALSE 
                    ORDER BY end_date DESC 
                    LIMIT 1
                );
            

                UPDATE billing_cycle
                SET 
                    end_date = CURRENT_DATE,
                    status = CASE 
                        WHEN CURRENT_DATE > end_date THEN 'overdue'
                        ELSE status
                    END
                WHERE subscription_id = (
                    SELECT subscription_id 
                    FROM subscription 
                    WHERE customer_id = $1 AND active = FALSE 
                    ORDER BY end_date DESC 
                    LIMIT 1
                );
            

                INSERT INTO subscription (customer_id, plan_id, start_date, active, promotion_id, prepaid_balance)
                VALUES ($1, $2, CURRENT_DATE, TRUE, $3, $4)
                RETURNING subscription_id;
            

                INSERT INTO subscription (customer_id, plan_id, start_date, active, promotion_id, prepaid_balance)
                VALUES ($1, $2, CURRENT_DATE, TRUE, $3, $4)
                RETURNING subscription_id;
            

                SELECT monthly_charge
                FROM phone_plan
                WHERE plan_id = $1;
            

                SELECT monthly_charge
                FROM phone_plan
                WHERE plan_id = $1;
            

                INSERT INTO subscription (customer_id, plan_id, start_date, active, promotion_id, prepaid_balance)
                VALUES ($1, $2, CURRENT_DATE, TRUE, $3, $4)
                RETURNING subscription_id;
            

                SELECT monthly_charge
                FROM phone_plan
                WHERE plan_id = $1;
            

                SELECT monthly_charge
                FROM phone_plan
                WHERE plan_id = $1;
            

                INSERT INTO billing_cycle (subscription_id, billing_date, start_date, end_date, subscription_charge, status)
                VALUES ($1, CURRENT_DATE + INTERVAL '31 days', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', $2, 'unpaid');
            

                INSERT INTO billing_cycle (subscription_id, billing_date, start_date, end_date, subscription_charge, status)
                VALUES ($1, CURRENT_DATE + INTERVAL '31 days', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', $2, 'unpaid');
            
COMMIT

                INSERT INTO billing_cycle (subscription_id, billing_date, start_date, end_date, subscription_charge, status)
                VALUES ($1, CURRENT_DATE + INTERVAL '31 days', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', $2, 'unpaid');
            

                INSERT INTO billing_cycle (subscription_id, billing_date, start_date, end_date, subscription_charge, status)
                VALUES ($1, CURRENT_DATE + INTERVAL '31 days', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', $2, 'unpaid');
            
COMMIT
COMMIT
END
END
COMMIT
END
END
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT 
                p.plan_id,
                p.plan_name,
                p.rate_per_minute,
                p.rate_per_MB,
                p.rate_per_char,
                p.MBs_soft_cap,
                p.international_rate,
                p.plan_type,
                p.monthly_charge
                FROM subscription s
                JOIN phone_plan p ON s.plan_id = p.plan_id
                WHERE s.customer_id = $1
                AND s.active = TRUE
 
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
