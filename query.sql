SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT * FROM phone_plan;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT
                customer_id, 
                phone_number
            FROM phone_number_list
            WHERE customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
SELECT 
                c.first_name,
                c.last_name, 
                c.email, 
                c.email_advertise_agree,
                c.date_of_birth,
                p.phone_number AS primary_phone_number
            FROM customer c
            LEFT JOIN phone_number_list p 
            ON c.customer_id = p.customer_id AND p.is_primary = TRUE
            WHERE c.customer_id = $1;
