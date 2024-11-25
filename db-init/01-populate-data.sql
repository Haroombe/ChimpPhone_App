-- Insert data into company_bank
INSERT INTO company_bank (bank_account_id, account_name, account_number, routing_number, balance) VALUES
(1, 'Chimpphone main', '123456789', '987654321', 500000989.00);

-- Insert data into customer
INSERT INTO customer ( first_name, last_name, email, email_advertise_agree, date_of_birth, zip_code, password, created_time) VALUES
('John', 'Burger', 'john.burger@example.com', TRUE, '1985-05-15', '12345', 'hashedpassword1', CURRENT_TIMESTAMP),
( 'Jane', 'Star', 'jane.star@example.com', FALSE, '1990-07-20', '54321', 'hashedpassword2', CURRENT_TIMESTAMP),
( 'Alice', 'Johnson', 'alice.johnson@example.com', TRUE, '1988-12-05', '11223', 'hashedpassword3', CURRENT_TIMESTAMP),
( 'Bond', 'Williams', 'bond.williams@example.com', FALSE, '1975-03-14', '33445', 'hashedpassword4', CURRENT_TIMESTAMP),
( 'Char', 'Comet', 'char.comet@example.com', TRUE, '1992-08-21', '55667', 'hashedpassword5', CURRENT_TIMESTAMP),
( 'Diana', 'Prince', 'diana.prince@example.com', TRUE, '1990-05-29', '77889', 'hashedpassword6', CURRENT_TIMESTAMP),
( 'Emily', 'Violet', 'emily.violet@example.com', FALSE, '1994-01-17', '99001', 'hashedpassword7', CURRENT_TIMESTAMP),
( 'Kiryu', 'Kazuma', 'kiryu.kazuma@example.com', TRUE, '1980-11-03', '10203', 'hashedpassword8', CURRENT_TIMESTAMP),
( 'Grace', 'Hopper', 'grace.hopper@example.com', FALSE, '1985-07-15', '20304', 'hashedpassword9', CURRENT_TIMESTAMP),
( 'Hank', 'Pym', 'hank.pym@example.com', TRUE, '1991-06-11', '30405', 'hashedpassword10', CURRENT_TIMESTAMP),
( 'Ivy', 'Green', 'ivy.green@example.com', TRUE, '1987-09-22', '40506', 'hashedpassword11', CURRENT_TIMESTAMP),
('Jack', 'Reaper', 'jack.reaper@example.com', FALSE, '1993-04-19', '50607', 'hashedpassword12', CURRENT_TIMESTAMP);

-- Insert data into bank_account
INSERT INTO bank_account ( customer_id, card_number, name, exp_date, cvv, balance, default_flag) VALUES
( 1, '1111222233334444', 'John Burger', '2025-12-31', '123', 1000.00, TRUE),
( 2, '2222333344445555', 'Jane Star', '2026-11-30', '456', 2000.00, TRUE),
( 3, '3333444455556666', 'Alice Johnson', '2025-10-31', '789', 1500.00, TRUE),
( 4, '4444555566667777', 'Bond Williams', '2026-09-30', '101', 2500.00, TRUE),
( 5, '5555666677778888', 'Char Comet', '2024-08-31', '111', 800.00, TRUE),
( 6, '6666777788889999', 'Diana Prince', '2027-07-31', '222', 3000.00, TRUE),
( 7, '7777888899990000', 'Emily Violet', '2025-06-30', '333', 500.00, TRUE),
( 8, '8888999900001111', 'Kiryu Kazuma', '2026-05-31', '444', 1200.00, TRUE),
( 9, '9999000011112222', 'Grace Hopper', '2024-04-30', '555', 2200.00, TRUE),
( 10, '0000111122223333', 'Hank Pym', '2025-03-31', '666', 1100.00, TRUE),
( 11, '1111000022223333', 'Ivy Green', '2026-02-28', '777', 1800.00, TRUE),
( 12, '2222000033334444', 'Jack Reaper', '2027-01-31', '888', 950.00, TRUE);

-- Insert data into phone_number_list
INSERT INTO phone_number_list (phone_number, customer_id, is_primary, added_date) VALUES
('15551234567', 1, TRUE, CURRENT_DATE),
('15557654321', 2, TRUE, CURRENT_DATE),
('15551234001', 3, TRUE, CURRENT_DATE),
('15551234002', 4, TRUE, CURRENT_DATE),
('15551234003', 5, TRUE, CURRENT_DATE),
('15551234004', 6, TRUE, CURRENT_DATE),
('15551234005', 7, TRUE, CURRENT_DATE),
('15551234006', 8, TRUE, CURRENT_DATE),
('15551234007', 9, TRUE, CURRENT_DATE),
('15551234008', 10, TRUE, CURRENT_DATE),
('15551234009', 11, TRUE, CURRENT_DATE),
('15551234010', 12, TRUE, CURRENT_DATE);

-- Insert data into phone_plan
INSERT INTO phone_plan ( plan_name, rate_per_minute, rate_per_MB, rate_per_char, MBs_soft_cap, MBs_hard_cap, plan_type, monthly_charge) VALUES
('Prepaid', 0.10, 0.05, 0.01, 20000.00, 8000.00, 'prepaid', NULL),
( 'Postpaid', 0.08, 0.04, 0.01, 20000.00, 8000.00, 'postpaid', NULL),
( 'Unlimited Basic', NULL, NULL, NULL, 25000.00, 10000.00, 'unlimited', 50.00),
( 'Unlimited Premium', NULL, NULL, NULL, 35000.00, 12000.00, 'unlimited', 80.00),
( 'EasyTravel', 0.20, NULL, NULL, 20000.00, 30000.00, 'travel', 50.00);

-- Insert data into promotion
INSERT INTO promotion ( promotion_name, discount_code, discount_type, discount_value, start_date, end_date, min_subscription_duration, min_spending, applicable_plan_id, previous_provider_require) VALUES
('Multi Lines Discount', 'MANY10', 'percentage', 10.00, '2024-01-01', '2024-12-31', 0, 100.00, 2, FALSE),
( 'Welcome Prepaid Bonus', 'WELCOMEPRE5', 'fixed', 20.00, '2024-01-01', '2024-12-31', 0, 0.00, 1, FALSE),
( 'Welcome Postpaid Bonus', 'WELCOMEPOST5', 'fixed', 20.00, '2024-01-01', '2024-12-31', 0, 0.00, 2, FALSE),
( 'Welcome Unlimited Bonus', 'WELCOMEUN5', 'fixed', 30.00, '2024-01-01', '2024-12-31', 0, 0.00, 3, FALSE),
( 'Change Service Bonus', 'NEWEXP', 'percentage', 50.00, '2024-01-01', '2024-12-31', 0, 0.00, 3, TRUE);

-- Insert data into subscription
INSERT INTO subscription ( customer_id, plan_id, start_date, end_date, active, promotion_id, prepaid_balance) VALUES
( 1, 1, CURRENT_DATE, NULL, TRUE, 2, 50.00),  -- Prepaid
( 2, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
( 3, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
( 4, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
( 5, 1, CURRENT_DATE, NULL, TRUE, 2, 30.00),  -- Prepaid
( 6, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
( 7, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL),    -- EasyTravel
( 8, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
( 9, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
( 10, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
( 11, 1, CURRENT_DATE, NULL, TRUE, NULL, 40.00), -- Prepaid
( 12, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL);  -- EasyTravel;

-- Insert data into billing_cycle
INSERT INTO billing_cycle (subscription_id, start_date, billing_date, end_date, subscription_charge, call_charge, sms_charge, data_charge, tax, total_charge, status) VALUES
(1, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 1.50, 1.60, 0.00, 1.31, 14.41, 'paid'), -- Prepaid
(2, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 0.00, 0.00, 50.00, 10.00, 110.00, 'paid'), -- Unlimited
(3, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 25.00, 10.00, 0.00, 5.50, 60.50, 'unpaid'), -- Postpaid
(4, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 80.00, 16.00, 176.00, 'paid'), -- Unlimited Premium
(5, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 2.50, 1.80, 0.00, 1.43, 15.73, 'unpaid'), -- Prepaid
(6, '2024-10-01', '2024-11-02', '2024-11-01', 90.00, 0.00, 0.00, 90.00, 18.00, 198.00, 'overdue'), -- Unlimited Premium
(7, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 13.00, 2.75, 0.00, 6.58, 72.33, 'paid'), -- Travel
(8, '2024-11-15', '2024-12-16', '2024-12-15', 75.00, 0.00, 0.00, 75.00, 15.00, 165.00, 'paid'), -- Unlimited Basic
(9, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 18.00, 6.00, 0.00, 4.40, 48.40, 'unpaid'), -- Postpaid
(10, '2024-11-15', '2024-12-16', '2024-12-15', 100.00, 0.00, 0.00, 100.00, 20.00, 220.00, 'paid'), -- Unlimited Premium
(11, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 12.00, 5.00, 0.00, 2.70, 29.70, 'paid'), -- Prepaid
(12, '2024-10-01', '2024-11-02', '2024-11-01', 50.00, 30.00, 12.00, 0.00, 9.20, 101.20, 'overdue'); -- Travel

-- Insert data into data_usage
INSERT INTO data_usage (phone_number, data_used, cost) VALUES
('15551234567', 500.00, 25.00),
('15557654321', 2000.00, 100.00),
('15551234001', 1500.00, 75.00),
('15551234002', 2000.00, 100.00),
('15551234003', 500.00, 25.00),
('15551234004', 3000.00, 150.00),
('15551234005', 1000.00, 50.00),
('15551234006', 2500.00, 125.00),
('15551234007', 1200.00, 60.00),
('15551234008', 3500.00, 175.00),
('15551234009', 600.00, 30.00),
('15551234010', 2000.00, 100.00);

INSERT INTO international_data_usage (phone_number, data_used, flat_rate, cost) VALUES
('15551234567', 50.00, 1.00, 50.00),
('15557654321', 30.00, 0.00, 0.00), -- travel plan
('15551234001', 100.00, 1.00, 100.00),
('15551234002', 75.00, 1.00, 75.00),
('15551234003', 60.00, 1.00, 60.00),
('15551234004', 120.00, 1.00, 120.00),
('15551234005', 40.00, 0.00, 0.00), --travel plan
('15551234006', 90.00, 1.00, 90.00),
('15551234007', 80.00, 1.00, 80.00),
('15551234008', 150.00, 1.00, 150.00);

-- Insert data into international_code
INSERT INTO international_code (country_code, country_name, rate_per_min, sms_rate) VALUES
(1, 'Canada', 0.10, 0.05),
(52, 'Mexico', 0.15, 0.08),
(44, 'United Kingdom', 0.12, 0.06),
(91, 'India', 0.07, 0.03),
(81, 'Japan', 0.20, 0.10),
(49, 'Germany', 0.13, 0.07),
(33, 'France', 0.14, 0.06),
(61, 'Australia', 0.11, 0.05),
(86, 'China', 0.09, 0.04),
(7, 'Russia', 0.18, 0.09);

-- Insert data into partner_provider
INSERT INTO partner_provider (provider_id, provider_name, country_code) VALUES
(1, 'Rogers', 52),          -- Mexico
(2, 'Fido', 1),             -- Canada
(3, 'Telcel', 52),          -- Mexico
(4, 'Vodafone', 44),        -- United Kingdom
(5, 'Jio', 91),             -- India
(6, 'SoftBank', 81),        -- Japan
(7, 'T-Mobile', 49),        -- Germany
(8, 'Orange', 33),          -- France
(9, 'Optus', 61),           -- Australia
(10, 'China Mobile', 86),   -- China
(11, 'Beeline', 7);         -- Russia

-- Insert data into home_area
INSERT INTO home_area (area_id, zipcode, city, state, active) VALUES
(1, '12345', 'New York', 'NY', TRUE),
(2, '54321', 'Los Angeles', 'CA', TRUE),
(3, '77088', 'Houston', 'TX', TRUE),
(4, '77072', 'Houston', 'TX', TRUE),
(5, '77024', 'Houston', 'TX', TRUE),
(6, '77494', 'Katy', 'TX', TRUE),
(7, '77407', 'Richmond', 'TX', TRUE),
(8, '77469', 'Sugarland', 'TX', TRUE),
(9, '94102', 'San Francisco', 'CA', TRUE),
(10, '60601', 'Chicago', 'IL', TRUE),
(11, '60607', 'Chicago', 'IL', TRUE),
(12, '30301', 'Atlanta', 'GA', TRUE),
(13, '33101', 'Miami', 'FL', TRUE),
(14, '85001', 'Phoenix', 'AZ', TRUE),
(15, '85281', 'Tempe', 'AZ', TRUE),
(16, '80201', 'Denver', 'CO', TRUE),
(17, '98101', 'Seattle', 'WA', TRUE),
(18, '97201', 'Portland', 'OR', TRUE),
(19, '02101', 'Boston', 'MA', TRUE),
(20, '94103', 'San Francisco', 'CA', TRUE),
(21, '10001', 'New York', 'NY', TRUE),
(22, '75201', 'Dallas', 'TX', TRUE),
(23, '28201', 'Charlotte', 'NC', TRUE),
(24, '46201', 'Indianapolis', 'IN', TRUE),
(25, '48201', 'Detroit', 'MI', TRUE),
(26, '55401', 'Minneapolis', 'MN', TRUE),
(27, '70112', 'New Orleans', 'LA', TRUE),
(28, '38101', 'Memphis', 'TN', TRUE),
(29, '75216', 'Dallas', 'TX', TRUE),
(30, '72201', 'Little Rock', 'AR', TRUE),
(31, '63101', 'St. Louis', 'MO', TRUE),
(32, '43201', 'Columbus', 'OH', TRUE),
(33, '37201', 'Nashville', 'TN', TRUE),
(34, '20001', 'Washington', 'DC', TRUE),
(35, '27601', 'Raleigh', 'NC', TRUE),
(36, '85032', 'Phoenix', 'AZ', TRUE),
(37, '90210', 'Beverly Hills', 'CA', TRUE),
(38, '94016', 'Daly City', 'CA', TRUE),
(39, '78664', 'Round Rock', 'TX', TRUE),
(40, '53201', 'Milwaukee', 'WI', TRUE);

-- Insert data into call_log
INSERT INTO call_log (from_phone_number, area_id, country_code, start_time, end_time, duration, to_number, call_type, roaming_cost, discount, total_cost) VALUES
( '15551234567', 1, NULL, '2024-11-01 09:00:00', '2024-11-01 09:15:00', 15, '15559876543', 'domestic', NULL, 0.00, 1.50),-- Domestic
( '15551234567', 1, 52, '2024-11-01 10:00:00', '2024-11-01 10:20:00', 20, '525556547890', 'international', 5.00, 0.50, 7.50),-- International
( '15551234567', 1, NULL, '2024-11-01 11:00:00', '2024-11-01 11:10:00', 10, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
( '15551234003', 5, 91, '2024-11-02 12:00:00', '2024-11-02 12:30:00', 30, '919876543210', 'international', 7.50, 1.00, 10.50), -- International
( '15551234005', 7, NULL, '2024-11-02 14:00:00', '2024-11-02 14:20:00', 20, '15559876543', 'domestic', NULL, 0.50, 2.50), -- Domestic
( '15551234007', 9, 33, '2024-11-02 16:00:00', '2024-11-02 16:25:00', 25, '33654321789', 'international', 5.00, 0.75, 7.75), -- International
( '15551234009', 12, NULL, '2024-11-03 09:00:00', '2024-11-03 09:30:00', 30, '15559987654', 'domestic', NULL, 0.30, 1.50), -- Domestic
( '15551234006', 8, 44, '2024-11-03 15:00:00', '2024-11-03 15:40:00', 40, '44123456789', 'international', 8.00, 1.20, 11.20), -- International
( '15551234002', 2, NULL, '2024-11-04 10:00:00', '2024-11-04 10:45:00', 45, '15551234567', 'domestic', NULL, 0.45, 2.25), -- Domestic
( '15551234010', 15, 81, '2024-11-04 18:00:00', '2024-11-04 18:15:00', 15, '81876543210', 'international', 4.50, 0.60, 6.10), -- International
( '15551234004', 4, NULL, '2024-11-05 11:30:00', '2024-11-05 11:50:00', 20, '15559876541', 'domestic', NULL, 0.25, 1.50), -- Domestic
( '15551234001', 3, 7, '2024-11-05 21:00:00', '2024-11-05 21:20:00', 20, '79876543210', 'international', 6.00, 0.80, 8.80); -- International

-- Insert data into sms_log
INSERT INTO sms_log (phone_number, time, area_id, char_count, to_number, roaming_cost, discount, total_cost) VALUES
('15551234567', '2024-11-01 12:00:00', 1, 160, '15559876543', NULL, 0.00, 1.60), -- Domestic
('15557654321', '2024-11-02 14:30:00', 2, 200, '52559876543', 0.50, 0.10, 2.50), -- International
('15551234001', '2024-11-03 16:45:00', 3, 120, '44123456789', 0.25, 0.05, 1.20), -- International
('15551234002', '2024-11-03 18:00:00', 4, 180, '15557654321', NULL, 0.00, 1.80), -- Domestic
('15551234003', '2024-11-04 10:15:00', 5, 140, '919876543210', 0.30, 0.10, 1.60), -- International
('15551234004', '2024-11-04 12:50:00', 6, 160, '15559876541', NULL, 0.00, 1.60), -- Domestic
('15551234005', '2024-11-05 09:30:00', 7, 250, '33654321789', 0.40, 0.15, 2.75), -- International
('15551234006', '2024-11-05 11:10:00', 8, 300, '15559987654', NULL, 0.00, 3.00), -- Domestic
('15551234007', '2024-11-06 14:00:00', 9, 100, '79876543210', 0.20, 0.05, 1.15), -- International
('15551234008', '2024-11-06 15:45:00', 10, 160, '81876543210', NULL, 0.00, 1.60), -- Domestic
('15551234009', '2024-11-07 08:15:00', 11, 200, '15559812345', NULL, 0.00, 2.00), -- Domestic
('15551234010', '2024-11-07 20:30:00', 12, 220, '44123456789', 0.35, 0.05, 2.50); -- International

-- Insert data into call_transit
INSERT INTO call_transit ( call_id, from_area, to_area, transit_time) VALUES
( 2, 1, 2, '2024-11-01 10:10:00'),
( 4, 5, 6, '2024-11-02 12:15:00'),
( 6, 9, 10, '2024-11-02 16:15:00'),
( 8, 7, 8, '2024-11-03 15:20:00'),
( 9, 2, 3, '2024-11-04 10:15:00'),
( 10, 15, 12, '2024-11-04 18:10:00'),
( 11, 4, 6, '2024-11-05 11:40:00'),
( 12, 3, 5, '2024-11-05 21:10:00'),
( 3, 1, 2, '2024-11-01 11:05:00'),
( 5, 7, 8, '2024-11-02 14:05:00');
