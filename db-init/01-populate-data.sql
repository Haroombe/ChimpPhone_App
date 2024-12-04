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
('Jack', 'Reaper', 'jack.reaper@example.com', FALSE, '1993-04-19', '50607', 'hashedpassword12', CURRENT_TIMESTAMP),
('Emma', 'Robert', 'emma.Robertr@example.com', FALSE, '1983-04-19', '40607', 'hashedpassword13', CURRENT_TIMESTAMP),
('Daniel', 'Brown', 'daniel.brown@example.com', FALSE, '1980-05-14', '67890', 'hashed_password5', CURRENT_TIMESTAMP),
('Sophia', 'Martinez', 'sophia.martinez@example.com', TRUE, '1998-11-30', '98765', 'hashed_password6', CURRENT_TIMESTAMP),
('Liam', 'Garcia', 'liam.garcia@example.com', FALSE, '1993-06-17', '11223', 'hashed_password7', CURRENT_TIMESTAMP),
('Olivia', 'Martinez', 'olivia.martinez@example.com', TRUE, '1989-08-03', '44556', 'hashed_password8', CURRENT_TIMESTAMP),
('James', 'Hernandez', 'james.hernandez@example.com', TRUE, '1991-12-01', '77889', 'hashed_password9', CURRENT_TIMESTAMP),
('Isabella', 'Lopez', 'isabella.lopez@example.com', FALSE, '1996-10-21', '99000', 'hashed_password10', CURRENT_TIMESTAMP),
('Ethan', 'Gonzalez', 'ethan.gonzalez@example.com', TRUE, '1997-02-11', '22334', 'hashed_password11', CURRENT_TIMESTAMP),
('Mia', 'Wilson', 'mia.wilson@example.com', FALSE, '1987-04-15', '55677', 'hashed_password12', CURRENT_TIMESTAMP),
('Alexander', 'Anderson', 'alex.anderson@example.com', TRUE, '1988-09-07', '88900', 'hashed_password13', CURRENT_TIMESTAMP),
('Ava', 'Thomas', 'ava.thomas@example.com', TRUE, '1983-01-28', '00112', 'hashed_password14', CURRENT_TIMESTAMP),
('William', 'Moore', 'william.moore@example.com', FALSE, '1982-05-09', '33445', 'hashed_password15', CURRENT_TIMESTAMP),
('Charlotte', 'Taylor', 'charlotte.taylor@example.com', TRUE, '1994-03-19', '66778', 'hashed_password16', CURRENT_TIMESTAMP),
('Henry', 'Lee', 'henry.lee@example.com', FALSE, '1986-07-22', '99011', 'hashed_password17', CURRENT_TIMESTAMP),
('Amelia', 'Walker', 'amelia.walker@example.com', TRUE, '1990-02-13', '22345', 'hashed_password18', CURRENT_TIMESTAMP),
('Noah', 'White', 'noah.white@example.com', FALSE, '1981-06-30', '55678', 'hashed_password19', CURRENT_TIMESTAMP),
('Emma', 'Young', 'emma.young@example.com', TRUE, '1999-11-15', '88901', 'hashed_password20', CURRENT_TIMESTAMP),
('Benjamin', 'Clark', 'benjamin.clark@example.com', TRUE, '1991-04-12', '11234', 'hashed_password21', CURRENT_TIMESTAMP),
('Ella', 'Lewis', 'ella.lewis@example.com', FALSE, '1995-02-25', '22345', 'hashed_password22', CURRENT_TIMESTAMP),
('Matthew', 'Scott', 'matthew.scott@example.com', TRUE, '1987-08-10', '33456', 'hashed_password23', CURRENT_TIMESTAMP),
('Grace', 'Green', 'grace.green@example.com', TRUE, '1989-06-30', '44567', 'hashed_password24', CURRENT_TIMESTAMP),
('Jackson', 'Adams', 'jackson.adams@example.com', FALSE, '1992-11-03', '55678', 'hashed_password25', CURRENT_TIMESTAMP),
('Avery', 'Hill', 'avery.hill@example.com', TRUE, '1998-01-15', '66789', 'hashed_password26', CURRENT_TIMESTAMP),
('Sebastian', 'Baker', 'sebastian.baker@example.com', FALSE, '1980-12-28', '77890', 'hashed_password27', CURRENT_TIMESTAMP),
('Harper', 'Campbell', 'harper.campbell@example.com', TRUE, '1994-07-09', '88901', 'hashed_password28', CURRENT_TIMESTAMP),
('Logan', 'Mitchell', 'logan.mitchell@example.com', FALSE, '1986-03-03', '99012', 'hashed_password29', CURRENT_TIMESTAMP),
('Scarlett', 'Perez', 'scarlett.perez@example.com', TRUE, '1997-05-22', '00123', 'hashed_password30', CURRENT_TIMESTAMP),
('Elijah', 'Roberts', 'elijah.roberts@example.com', TRUE, '1984-08-19', '11245', 'hashed_password31', CURRENT_TIMESTAMP),
('Aria', 'Turner', 'aria.turner@example.com', FALSE, '1990-10-10', '22356', 'hashed_password32', CURRENT_TIMESTAMP),
('Lucas', 'Phillips', 'lucas.phillips@example.com', TRUE, '1993-06-25', '33467', 'hashed_password33', CURRENT_TIMESTAMP),
('Chloe', 'Carter', 'chloe.carter@example.com', TRUE, '1999-09-07', '44578', 'hashed_password34', CURRENT_TIMESTAMP),
('Mason', 'Torres', 'mason.torres@example.com', FALSE, '1988-02-16', '55689', 'hashed_password35', CURRENT_TIMESTAMP),
('Ella', 'Evans', 'ella.evans@example.com', TRUE, '1982-03-05', '66790', 'hashed_password36', CURRENT_TIMESTAMP),
('Oliver', 'Edwards', 'oliver.edwards@example.com', FALSE, '1985-11-20', '77801', 'hashed_password37', CURRENT_TIMESTAMP),
('Sophia', 'Collins', 'sophia.collins@example.com', TRUE, '1996-01-10', '88912', 'hashed_password38', CURRENT_TIMESTAMP),
('Levi', 'Stewart', 'levi.stewart@example.com', FALSE, '1981-04-28', '99023', 'hashed_password39', CURRENT_TIMESTAMP),
('Zoey', 'Morris', 'zoey.morris@example.com', TRUE, '1994-12-18', '00134', 'hashed_password40', CURRENT_TIMESTAMP),
('Evelyn', 'King', 'evelyn.king@example.com', TRUE, '1992-03-14', '12355', 'hashed_password41', CURRENT_TIMESTAMP),
('Aiden', 'Wright', 'aiden.wright@example.com', FALSE, '1987-07-18', '23456', 'hashed_password42', CURRENT_TIMESTAMP),
('Lily', 'Clark', 'lily.clark@example.com', TRUE, '1995-02-22', '34567', 'hashed_password43', CURRENT_TIMESTAMP),
('Mila', 'Lewis', 'mila.lewis@example.com', TRUE, '1993-05-09', '45678', 'hashed_password44', CURRENT_TIMESTAMP),
('Carter', 'Walker', 'carter.walker@example.com', FALSE, '1989-10-28', '56789', 'hashed_password45', CURRENT_TIMESTAMP),
('Hannah', 'Hall', 'hannah.hall@example.com', TRUE, '1990-06-15', '67890', 'hashed_password46', CURRENT_TIMESTAMP),
('Wyatt', 'Young', 'wyatt.young@example.com', FALSE, '1988-09-20', '78901', 'hashed_password47', CURRENT_TIMESTAMP),
('Sofia', 'Harris', 'sofia.harris@example.com', TRUE, '1997-11-03', '89012', 'hashed_password48', CURRENT_TIMESTAMP),
('Jack', 'Martin', 'jack.martin@example.com', TRUE, '1999-01-17', '90123', 'hashed_password49', CURRENT_TIMESTAMP),
('Camila', 'Thompson', 'camila.thompson@example.com', FALSE, '1985-08-08', '01234', 'hashed_password50', CURRENT_TIMESTAMP),
('Julian', 'Garcia', 'julian.garcia@example.com', TRUE, '1986-04-11', '12345', 'hashed_password51', CURRENT_TIMESTAMP),
('Aurora', 'Martinez', 'aurora.martinez@example.com', TRUE, '1998-02-19', '23456', 'hashed_password52', CURRENT_TIMESTAMP),
('Ezra', 'Rodriguez', 'ezra.rodriguez@example.com', FALSE, '1994-07-23', '34567', 'hashed_password53', CURRENT_TIMESTAMP),
('Layla', 'Lopez', 'layla.lopez@example.com', TRUE, '1991-03-25', '45678', 'hashed_password54', CURRENT_TIMESTAMP),
('Isaac', 'Hill', 'isaac.hill@example.com', FALSE, '1983-09-13', '56789', 'hashed_password55', CURRENT_TIMESTAMP),
('Victoria', 'Scott', 'victoria.scott@example.com', TRUE, '1980-12-30', '67890', 'hashed_password56', CURRENT_TIMESTAMP),
('Leah', 'Green', 'leah.green@example.com', FALSE, '1989-04-05', '78901', 'hashed_password57', CURRENT_TIMESTAMP),
('Eliana', 'Moore', 'eliana.moore@example.com', TRUE, '1996-05-15', '89012', 'hashed_password58', CURRENT_TIMESTAMP),
('Landon', 'Adams', 'landon.adams@example.com', TRUE, '1992-06-18', '90123', 'hashed_password59', CURRENT_TIMESTAMP),
('Madelyn', 'Torres', 'madelyn.torres@example.com', FALSE, '1993-02-14', '01234', 'hashed_password60', CURRENT_TIMESTAMP),
('Nathan', 'Reed', 'nathan.reed@example.com', TRUE, '1990-01-21', '13579', 'hashed_password61', CURRENT_TIMESTAMP),
('Aubrey', 'Long', 'aubrey.long@example.com', FALSE, '1992-03-11', '24680', 'hashed_password62', CURRENT_TIMESTAMP),
('Eli', 'Wright', 'eli.wright@example.com', TRUE, '1988-09-22', '35791', 'hashed_password63', CURRENT_TIMESTAMP),
('Penelope', 'Parker', 'penelope.parker@example.com', TRUE, '1984-07-18', '46802', 'hashed_password64', CURRENT_TIMESTAMP),
('Connor', 'Anderson', 'connor.anderson@example.com', FALSE, '1985-05-08', '57913', 'hashed_password65', CURRENT_TIMESTAMP),
('Bella', 'Hughes', 'bella.hughes@example.com', TRUE, '1993-06-25', '68024', 'hashed_password66', CURRENT_TIMESTAMP),
('Andrew', 'Cook', 'andrew.cook@example.com', FALSE, '1987-12-03', '79135', 'hashed_password67', CURRENT_TIMESTAMP),
('Riley', 'Morgan', 'riley.morgan@example.com', TRUE, '1999-04-10', '80246', 'hashed_password68', CURRENT_TIMESTAMP),
('Zoe', 'Peterson', 'zoe.peterson@example.com', FALSE, '1998-10-19', '91357', 'hashed_password69', CURRENT_TIMESTAMP),
('Jonathan', 'Cox', 'jonathan.cox@example.com', TRUE, '1983-08-23', '02468', 'hashed_password70', CURRENT_TIMESTAMP),
('Hazel', 'Richardson', 'hazel.richardson@example.com', TRUE, '1982-11-07', '13579', 'hashed_password71', CURRENT_TIMESTAMP),
('Aaron', 'Wood', 'aaron.wood@example.com', FALSE, '1989-03-02', '24680', 'hashed_password72', CURRENT_TIMESTAMP),
('Savannah', 'Cooper', 'savannah.cooper@example.com', TRUE, '1996-02-12', '35791', 'hashed_password73', CURRENT_TIMESTAMP),
('Hudson', 'Bell', 'hudson.bell@example.com', FALSE, '1981-07-17', '46802', 'hashed_password74', CURRENT_TIMESTAMP),
('Nova', 'Griffin', 'nova.griffin@example.com', TRUE, '1991-06-14', '57913', 'hashed_password75', CURRENT_TIMESTAMP),
('Isaiah', 'Russell', 'isaiah.russell@example.com', FALSE, '1994-09-29', '68024', 'hashed_password76', CURRENT_TIMESTAMP),
('Luna', 'Ward', 'luna.ward@example.com', TRUE, '1997-05-05', '79135', 'hashed_password77', CURRENT_TIMESTAMP),
('Hunter', 'James', 'hunter.james@example.com', TRUE, '1995-08-21', '80246', 'hashed_password78', CURRENT_TIMESTAMP),
('Ellie', 'Bennett', 'ellie.bennett@example.com', FALSE, '1986-12-10', '91357', 'hashed_password79', CURRENT_TIMESTAMP),
('Joseph', 'Bailey', 'joseph.bailey@example.com', TRUE, '1980-01-03', '02468', 'hashed_password80', CURRENT_TIMESTAMP),
('Caleb', 'Brooks', 'caleb.brooks@example.com', TRUE, '1993-07-04', '12346', 'hashed_password81', CURRENT_TIMESTAMP),
('Maya', 'Rogers', 'maya.rogers@example.com', FALSE, '1992-09-12', '23457', 'hashed_password82', CURRENT_TIMESTAMP),
('Anthony', 'Price', 'anthony.price@example.com', TRUE, '1990-01-19', '34568', 'hashed_password83', CURRENT_TIMESTAMP),
('Natalie', 'Powell', 'natalie.powell@example.com', TRUE, '1991-03-22', '45679', 'hashed_password84', CURRENT_TIMESTAMP),
('Adrian', 'Howard', 'adrian.howard@example.com', FALSE, '1998-05-05', '56780', 'hashed_password85', CURRENT_TIMESTAMP),
('Lillian', 'Fisher', 'lillian.fisher@example.com', TRUE, '1997-08-09', '67891', 'hashed_password86', CURRENT_TIMESTAMP),
('Ezekiel', 'Ward', 'ezekiel.ward@example.com', FALSE, '1986-06-17', '78902', 'hashed_password87', CURRENT_TIMESTAMP),
('Stella', 'Henderson', 'stella.henderson@example.com', TRUE, '1999-11-11', '89013', 'hashed_password88', CURRENT_TIMESTAMP),
('Gabriel', 'Coleman', 'gabriel.coleman@example.com', FALSE, '1987-04-25', '90124', 'hashed_password89', CURRENT_TIMESTAMP),
('Hannah', 'Butler', 'hannah.butler@example.com', TRUE, '1994-02-14', '01235', 'hashed_password90', CURRENT_TIMESTAMP),
('Samuel', 'Carter', 'samuel.carter@example.com', TRUE, '1995-08-29', '12346', 'hashed_password91', CURRENT_TIMESTAMP),
('Violet', 'Sanders', 'violet.sanders@example.com', FALSE, '1988-12-18', '23457', 'hashed_password92', CURRENT_TIMESTAMP),
('Nolan', 'Stewart', 'nolan.stewart@example.com', TRUE, '1996-05-21', '34568', 'hashed_password93', CURRENT_TIMESTAMP),
('Paisley', 'Reed', 'paisley.reed@example.com', TRUE, '1991-10-08', '45679', 'hashed_password94', CURRENT_TIMESTAMP),
('Eli', 'Bell', 'eli.bell@example.com', FALSE, '1989-03-05', '56780', 'hashed_password95', CURRENT_TIMESTAMP),
('Anna', 'Murphy', 'anna.murphy@example.com', TRUE, '1983-09-30', '67891', 'hashed_password96', CURRENT_TIMESTAMP),
('Adam', 'Bryant', 'adam.bryant@example.com', FALSE, '1982-11-15', '78902', 'hashed_password97', CURRENT_TIMESTAMP),
('Madison', 'Alexander', 'madison.alexander@example.com', TRUE, '1990-02-07', '89013', 'hashed_password98', CURRENT_TIMESTAMP),
('Leo', 'Russell', 'leo.russell@example.com', TRUE, '1984-06-20', '90124', 'hashed_password99', CURRENT_TIMESTAMP),
('Aurora', 'Hayes', 'aurora.hayes@example.com', FALSE, '1992-03-13', '01235', 'hashed_password100', CURRENT_TIMESTAMP);


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
( 12, '2222000033334444', 'Jack Reaper', '2027-01-31', '888', 950.00, TRUE),
( 13, '2222000033334559', 'Emma Robert', '2027-01-31', '898', 1250.00, TRUE),
(14, '4111111111111111', 'Daniel Brown', '2026-05-01', '123', 1500.50, TRUE),
(15, '4111111111111112', 'Emma Robert', '2025-12-31', '456', 800.00, TRUE),
(16, '4111111111111113', 'Daniel Brown', '2024-08-15', '789', 250.00, FALSE),
(17, '4111111111111114', 'Sophia Martinez', '2027-03-20', '321', 1250.75, TRUE),
(18, '4111111111111115', 'Liam Garcia', '2023-10-10', '654', 300.00, FALSE),
(19, '4111111111111116', 'Olivia Martinez', '2026-01-25', '987', 4000.00, TRUE),
(20, '4111111111111117', 'James Hernandez', '2025-07-30', '111', 800.00, TRUE),
(21, '4111111111111118', 'Isabella Lopez', '2027-04-15', '222', 100.00, FALSE),
(22, '4111111111111119', 'Ethan Gonzalez', '2025-09-05', '333', 650.25, TRUE),
(23, '4111111111111120', 'Mia Wilson', '2026-12-31', '444', 2000.00, TRUE),
(24, '4111111111111121', 'Alexander Anderson', '2024-03-28', '555', 300.00, FALSE),
(25, '4111111111111122', 'Ava Thomas', '2025-06-18', '666', 500.00, TRUE),
(26, '4111111111111123', 'William Moore', '2027-09-12', '777', 1200.00, FALSE),
(27, '4111111111111124', 'Charlotte Taylor', '2023-11-25', '888', 1800.00, TRUE),
(28, '4111111111111125', 'Henry Lee', '2026-02-13', '999', 900.00, FALSE),
(29, '4111111111111126', 'Amelia Walker', '2025-04-19', '000', 2100.00, TRUE),
(30, '4111111111111127', 'Noah White', '2023-07-07', '101', 350.50, TRUE),
(31, '4111111111111128', 'Emma Young', '2024-12-25', '202', 450.00, FALSE),
(32, '4111111111111129', 'Benjamin Clark', '2026-03-03', '303', 125.00, TRUE),
(33, '4111111111111130', 'Ella Lewis', '2027-10-14', '404', 700.00, FALSE);
;

-- Insert data into transaction
INSERT INTO transaction (customer_id, amount, transaction_type)
VALUES
    (1, 150.00, 'charge'), -- Transaction for customer 1
    (1, 50.00, 'charge'),   -- Transaction for customer 1
    (2, 200.00, 'auto'), -- Transaction for customer 2
    (2, 100.00, 'auto'),  -- Transaction for customer 2
    (3, 500.00, 'payment'), -- Transaction for customer 3
    (3, 300.00, 'payment'),  -- Transaction for customer 3
    (4, 50.00, 'auto'),  -- Transaction for customer 4
    (4, 25.00, 'auto'),   -- Transaction for customer 4
    (5, 100.00, 'charge'), -- Transaction for customer 5
    (6, 60.00, 'auto');   -- Transaction for customer 5

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
('15551234010', 12, TRUE, CURRENT_DATE),
('15551234011', 13, TRUE, CURRENT_DATE),
('15551234012', 14, TRUE, CURRENT_DATE),
('15551234013', 15, TRUE, CURRENT_DATE),
('15551234014', 16, TRUE, CURRENT_DATE),
('15551234015', 17, TRUE, CURRENT_DATE),
('15551234016', 18, TRUE, CURRENT_DATE),
('15551234017', 19, TRUE, CURRENT_DATE),
('15551234018', 20, TRUE, CURRENT_DATE),
('15551234019', 21, TRUE, CURRENT_DATE),
('15551234020', 22, TRUE, CURRENT_DATE),
('15551234021', 23, TRUE, CURRENT_DATE),
('15551234022', 24, TRUE, CURRENT_DATE),
('15551234023', 25, TRUE, CURRENT_DATE),
('15551234024', 26, TRUE, CURRENT_DATE),
('15551234025', 27, TRUE, CURRENT_DATE),
('15551234026', 28, TRUE, CURRENT_DATE),
('15551234027', 29, TRUE, CURRENT_DATE),
('15551234028', 30, TRUE, CURRENT_DATE),
('15551234029', 31, TRUE, CURRENT_DATE),
('15551234030', 32, TRUE, CURRENT_DATE),
('15551234031', 33, TRUE, CURRENT_DATE),
('15551234032', 34, TRUE, CURRENT_DATE),
('15551234033', 35, TRUE, CURRENT_DATE),
('15551234034', 36, TRUE, CURRENT_DATE),
('15551234035', 37, TRUE, CURRENT_DATE),
('15551234036', 38, TRUE, CURRENT_DATE),
('15551234037', 39, TRUE, CURRENT_DATE),
('15551234038', 40, TRUE, CURRENT_DATE),
('15551234039', 41, TRUE, CURRENT_DATE),
('15551234040', 42, TRUE, CURRENT_DATE),
('15551234041', 43, TRUE, CURRENT_DATE),
('15551234042', 44, TRUE, CURRENT_DATE),
('15551234043', 45, TRUE, CURRENT_DATE),
('15551234044', 46, TRUE, CURRENT_DATE),
('15551234045', 47, TRUE, CURRENT_DATE),
('15551234046', 48, TRUE, CURRENT_DATE),
('15551234047', 49, TRUE, CURRENT_DATE),
('15551234048', 50, TRUE, CURRENT_DATE),
('15551234049', 51, TRUE, CURRENT_DATE),
('15551234050', 52, TRUE, CURRENT_DATE),
('15551234051', 53, TRUE, CURRENT_DATE),
('15551234052', 54, TRUE, CURRENT_DATE),
('15551234053', 55, TRUE, CURRENT_DATE),
('15551234054', 56, TRUE, CURRENT_DATE),
('15551234055', 57, TRUE, CURRENT_DATE),
('15551234056', 58, TRUE, CURRENT_DATE),
('15551234057', 59, TRUE, CURRENT_DATE),
('15551234058', 60, TRUE, CURRENT_DATE),
('15551234059', 61, TRUE, CURRENT_DATE),
('15551234060', 62, TRUE, CURRENT_DATE),
('15551234061', 63, TRUE, CURRENT_DATE),
('15551234062', 64, TRUE, CURRENT_DATE),
('15551234063', 65, TRUE, CURRENT_DATE),
('15551234064', 66, TRUE, CURRENT_DATE),
('15551234065', 67, TRUE, CURRENT_DATE),
('15551234066', 68, TRUE, CURRENT_DATE),
('15551234067', 69, TRUE, CURRENT_DATE),
('15551234068', 70, TRUE, CURRENT_DATE),
('15551234069', 71, TRUE, CURRENT_DATE),
('15551234070', 72, TRUE, CURRENT_DATE),
('15551234071', 73, TRUE, CURRENT_DATE),
('15551234072', 74, TRUE, CURRENT_DATE),
('15551234073', 75, TRUE, CURRENT_DATE),
('15551234074', 76, TRUE, CURRENT_DATE),
('15551234075', 77, TRUE, CURRENT_DATE),
('15551234076', 78, TRUE, CURRENT_DATE),
('15551234077', 79, TRUE, CURRENT_DATE),
('15551234078', 80, TRUE, CURRENT_DATE),
('15551234079', 81, TRUE, CURRENT_DATE),
('15551234080', 82, TRUE, CURRENT_DATE),
('15551234081', 83, TRUE, CURRENT_DATE),
('15551234082', 84, TRUE, CURRENT_DATE),
('15551234083', 85, TRUE, CURRENT_DATE),
('15551234084', 86, TRUE, CURRENT_DATE),
('15551234085', 87, TRUE, CURRENT_DATE),
('15551234086', 88, TRUE, CURRENT_DATE),
('15551234087', 89, TRUE, CURRENT_DATE),
('15551234088', 90, TRUE, CURRENT_DATE),
('15551234089', 91, TRUE, CURRENT_DATE),
('15551234090', 92, TRUE, CURRENT_DATE),
('15551234091', 93, TRUE, CURRENT_DATE),
('15551234092', 94, TRUE, CURRENT_DATE),
('15551234093', 95, TRUE, CURRENT_DATE),
('15551234094', 96, TRUE, CURRENT_DATE),
('15551234095', 97, TRUE, CURRENT_DATE),
('15551234096', 98, TRUE, CURRENT_DATE),
('15551234097', 99, TRUE, CURRENT_DATE),
('15551234098', 100, TRUE, CURRENT_DATE),
('15551234099', 101, TRUE, CURRENT_DATE),
('15551234100', 102, TRUE, CURRENT_DATE),
('15551234101', 103, TRUE, CURRENT_DATE),
('15551234102', 104, TRUE, CURRENT_DATE),
('15551234103', 105, TRUE, CURRENT_DATE);

INSERT INTO phone_plan (plan_name, rate_per_minute, rate_per_MB, rate_per_char, MBs_soft_cap, MBs_hard_cap, 
international_rate, plan_type, monthly_charge) VALUES
('Prepaid', 0.10, 0.05, 0.01, 20000.00, 8000.00, 1.0, 'prepaid', 0.00),
('Postpaid', 0.08, 0.04, 0.01, 20000.00, 8000.00, 1.0, 'postpaid', 0.00),
('Unlimited Basic', 0.00, 0.00, 0.00, 25000.00, 10000.00, 1.0, 'unlimited', 50.00),
('Unlimited Premium', 0.00, 0.00, 0.00, 35000.00, 12000.00, 1.0, 'unlimited', 80.00),
('EasyTravel', 0.20, 0.00, 0.00, 20000.00, 30000.00, 0.00, 'travel', 50.00);

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
( 12, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL),  -- EasyTravel
(13, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(14, 1, CURRENT_DATE, NULL, TRUE, 3, 60.00),  -- Prepaid
(15, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(16, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(17, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(18, 1, CURRENT_DATE, NULL, TRUE, 2, 50.00),  -- Prepaid
(19, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(20, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(21, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(22, 1, CURRENT_DATE, NULL, TRUE, NULL, 40.00), -- Prepaid
(23, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(24, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(25, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(26, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(27, 1, CURRENT_DATE, NULL, TRUE, 3, 70.00),  -- Prepaid
(28, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(29, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(30, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(31, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(32, 1, CURRENT_DATE, NULL, TRUE, 2, 80.00),  -- Prepaid
(33, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(34, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(35, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(36, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(37, 1, CURRENT_DATE, NULL, TRUE, NULL, 20.00), -- Prepaid
(38, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(39, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(40, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(41, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(42, 1, CURRENT_DATE, NULL, TRUE, 3, 90.00),  -- Prepaid
(43, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(44, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(45, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(46, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(47, 1, CURRENT_DATE, NULL, TRUE, NULL, 50.00), -- Prepaid
(48, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(49, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(50, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(51, 1, CURRENT_DATE, NULL, TRUE, 3, 75.00),  -- Prepaid
(52, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(53, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(54, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(55, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(56, 1, CURRENT_DATE, NULL, TRUE, 4, 50.00),  -- Prepaid
(57, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(58, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(59, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(60, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(61, 1, CURRENT_DATE, NULL, TRUE, NULL, 40.00), -- Prepaid
(62, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(63, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(64, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(65, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(66, 1, CURRENT_DATE, NULL, TRUE, 3, 100.00),  -- Prepaid
(67, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(68, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(69, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(70, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(71, 1, CURRENT_DATE, NULL, TRUE, NULL, 30.00), -- Prepaid
(72, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(73, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(74, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(75, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(76, 1, CURRENT_DATE, NULL, TRUE, 4, 80.00),  -- Prepaid
(77, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(78, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(79, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(80, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(81, 1, CURRENT_DATE, NULL, TRUE, NULL, 60.00), -- Prepaid
(82, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(83, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(84, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(85, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(86, 1, CURRENT_DATE, NULL, TRUE, 3, 70.00),  -- Prepaid
(87, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(88, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(89, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(90, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(91, 1, CURRENT_DATE, NULL, TRUE, 4, 50.00),  -- Prepaid
(92, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(93, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(94, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(95, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(96, 1, CURRENT_DATE, NULL, TRUE, NULL, 40.00), -- Prepaid
(97, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(98, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(99, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(100, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- EasyTravel
(101, 1, CURRENT_DATE, NULL, TRUE, 4, 55.00),  -- Prepaid
(102, 2, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Postpaid
(103, 3, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Basic
(104, 4, CURRENT_DATE, NULL, TRUE, NULL, NULL), -- Unlimited Premium
(105, 5, CURRENT_DATE, NULL, TRUE, NULL, NULL); -- EasyTravel

-- Insert data into billing_cycle
INSERT INTO billing_cycle (subscription_id, start_date, billing_date, end_date, subscription_charge, call_charge, sms_charge, data_charge, tax, total_charge, status) VALUES
(1, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 1.50, 1.60, 0.00, 1.31, 14.41, 'paid'), -- Prepaid
(2, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 0.00, 0.00, 50.00, 10.00, 110.00, 'unpaid'), -- Unlimited
(3, '2024-10-15', '2024-11-16', '2024-11-15', 20.00, 25.00, 10.00, 0.00, 5.50, 60.50, 'paid'), -- Postpaid
(3, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 25.00, 10.00, 0.00, 5.50, 60.50, 'unpaid'), -- Postpaid
(4, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 80.00, 16.00, 176.00, 'paid'), -- Unlimited Premium
(4, '2024-10-15', '2024-11-16', '2024-11-15', 80.00, 0.00, 0.00, 80.00, 16.00, 176.00, 'paid'), -- Unlimited Premium
(5, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 2.50, 1.80, 0.00, 1.43, 15.73, 'unpaid'), -- Prepaid
(6, '2024-10-01', '2024-11-02', '2024-11-01', 90.00, 0.00, 0.00, 90.00, 18.00, 198.00, 'overdue'), -- Unlimited Premium
(7, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 13.00, 2.75, 0.00, 6.58, 72.33, 'paid'), -- Travel
(8, '2024-11-15', '2024-12-16', '2024-12-15', 75.00, 0.00, 0.00, 75.00, 15.00, 165.00, 'paid'), -- Unlimited Basic
(9, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 18.00, 6.00, 0.00, 4.40, 48.40, 'unpaid'), -- Postpaid
(10, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 0.00, 7.75, 87.75, 'paid'), -- Unlimited Premium
(10, '2024-10-15', '2024-11-16', '2024-11-15', 80.00, 0.00, 0.00, 0.00, 7.75, 87.75, 'overdue'), -- Unlimited Premium
(11, '2024-10-15', '2024-11-16', '2024-11-15', 10.00, 12.00, 5.00, 0.00, 2.70, 29.70, 'paid'), -- Prepaid
(12, '2024-10-01', '2024-11-02', '2024-11-01', 50.00, 30.00, 12.00, 0.00, 9.20, 101.20, 'overdue'),-- Travel
(11, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 12.00, 5.00, 0.00, 2.70, 29.70, 'unpaid'),-- Prepaid
(13, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 3.50, 2.00, 0.00, 1.15, 16.65, 'paid'), -- Prepaid
(14, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 0.00, 0.00, 50.00, 10.00, 110.00, 'unpaid'), -- Unlimited Basic
(15, '2024-10-15', '2024-11-16', '2024-11-15', 20.00, 20.00, 8.00, 0.00, 4.80, 52.80, 'paid'), -- Postpaid
(15, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 20.00, 8.00, 0.00, 4.80, 52.80, 'unpaid'), -- Postpaid
(16, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 80.00, 16.00, 176.00, 'paid'), -- Unlimited Premium
(17, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 2.50, 1.50, 0.00, 1.32, 15.32, 'unpaid'), -- Prepaid
(18, '2024-10-01', '2024-11-02', '2024-11-01', 90.00, 0.00, 0.00, 90.00, 18.00, 198.00, 'overdue'), -- Unlimited Premium
(19, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 10.00, 2.50, 0.00, 5.25, 67.75, 'paid'), -- Travel
(20, '2024-11-15', '2024-12-16', '2024-12-15', 75.00, 0.00, 0.00, 75.00, 15.00, 165.00, 'paid'), -- Unlimited Basic
(21, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 15.00, 5.50, 0.00, 4.05, 44.55, 'unpaid'), -- Postpaid
(22, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 0.00, 7.75, 87.75, 'paid'), -- Unlimited Premium
(23, '2024-10-15', '2024-11-16', '2024-11-15', 10.00, 10.00, 4.00, 0.00, 2.40, 26.40, 'paid'), -- Prepaid
(24, '2024-10-01', '2024-11-02', '2024-11-01', 50.00, 25.00, 10.00, 0.00, 8.25, 93.25, 'overdue'), -- Travel
(25, '2024-11-15', '2024-12-16', '2024-12-15', 10.00, 8.00, 3.00, 0.00, 1.90, 22.90, 'unpaid'), -- Prepaid
(26, '2024-10-15', '2024-11-16', '2024-11-15', 90.00, 0.00, 0.00, 90.00, 18.00, 198.00, 'paid'), -- Unlimited Premium
(27, '2024-11-15', '2024-12-16', '2024-12-15', 50.00, 5.00, 2.00, 0.00, 4.00, 61.00, 'paid'), -- Travel
(28, '2024-11-15', '2024-12-16', '2024-12-15', 75.00, 0.00, 0.00, 75.00, 15.00, 165.00, 'paid'), -- Unlimited Basic
(29, '2024-11-15', '2024-12-16', '2024-12-15', 20.00, 12.00, 4.50, 0.00, 3.35, 39.85, 'unpaid'), -- Postpaid
(30, '2024-11-15', '2024-12-16', '2024-12-15', 80.00, 0.00, 0.00, 0.00, 7.75, 87.75, 'paid'); -- Unlimited Premium; 

-- Insert data into data_usage
INSERT INTO data_usage (phone_number, month, data_used, cost) VALUES
('15551234567', '2024-11-01', 500.00, 25.00),
('15557654321', '2024-11-01', 2000.00, 100.00),
('15551234001', '2024-11-01', 1500.00, 75.00),
('15551234002', '2024-11-01', 2000.00, 0.00),
('15551234003', '2024-11-01', 500.00, 25.00),
('15551234004', '2024-11-01', 3000.00, 0),
('15551234005', '2024-11-01', 1000.00, 50.00),
('15551234006', '2024-11-01', 2500.00, 0.00),
('15551234007', '2024-11-01', 1200.00, 60.00),
('15551234008', '2024-11-01', 3500.00, 175.00),
('15551234009', '2024-11-01', 600.00, 30.00),
('15551234010', '2024-11-01', 2000.00, 100.00);

INSERT INTO international_data_usage (phone_number, month, data_used, cost) VALUES
('15551234567', '2024-11-01', 50.00, 50.00),
('15557654321', '2024-11-01', 30.00, 0.00), -- Travel plan
('15551234001', '2024-11-01', 100.00, 100.00),
('15551234002', '2024-11-01', 75.00, 75.00),
('15551234003', '2024-11-01', 60.00, 60.00),
('15551234004', '2024-11-01', 120.00, 120.00),
('15551234005', '2024-11-01', 40.00, 0.00), -- Travel plan
('15551234006', '2024-11-01', 90.00, 90.00),
('15551234007', '2024-11-01', 80.00, 80.00),
('15551234008', '2024-11-01', 150.00, 150.00);

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
( '15551234567', 1, NULL, '2024-11-05 11:00:00', '2024-11-05 11:10:00', 10, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
( '15551234003', 5, 91, '2024-11-02 12:00:00', '2024-11-02 12:30:00', 30, '919876543210', 'international', 7.50, 1.00, 10.50), -- International
( '15551234005', 7, NULL, '2024-11-02 14:00:00', '2024-11-02 14:20:00', 20, '15559876543', 'domestic', NULL, 0.50, 2.50), -- Domestic
( '15551234007', 9, 33, '2024-11-02 16:00:00', '2024-11-02 16:25:00', 25, '33654321789', 'international', 5.00, 0.75, 7.75), -- International
( '15551234009', 12, NULL, '2024-11-03 09:00:00', '2024-11-03 09:30:00', 30, '15559987654', 'domestic', NULL, 0.30, 1.50), -- Domestic
( '15551234006', 8, 44, '2024-11-03 15:00:00', '2024-11-03 15:40:00', 40, '44123456789', 'international', 8.00, 1.20, 11.20), -- International
( '15551234002', 2, NULL, '2024-11-04 10:00:00', '2024-11-04 10:45:00', 45, '15551234567', 'domestic', NULL, 0.45, 0.00), -- Domestic
( '15551234010', 15, 81, '2024-11-04 18:00:00', '2024-11-04 18:15:00', 15, '81876543210', 'international', 4.50, 0.60, 6.10), -- International
( '15551234004', 4, NULL, '2024-11-05 11:30:00', '2024-11-05 11:50:00', 20, '15559876541', 'domestic', NULL, 0.25, 0.00), -- Domestic
( '15551234004', 4, NULL, '2024-11-06 11:30:00', '2024-11-06 11:50:00', 20, '15559876541', 'domestic', NULL, 0.25, 0.00), -- Domestic
( '15551234001', 3, 7, '2024-11-05 21:00:00', '2024-11-05 21:20:00', 20, '79876543210', 'international', 6.00, 0.80, 8.80), -- International
('15551234567', 1, NULL, '2024-11-01 09:00:00', '2024-11-01 09:15:00', 15, '15559876543', 'domestic', NULL, 0.00, 1.50), -- Domestic
('15551234567', 1, 52, '2024-11-01 10:00:00', '2024-11-01 10:20:00', 20, '525556547890', 'international', 5.00, 0.50, 7.50), -- International
('15551234567', 1, NULL, '2024-11-05 11:00:00', '2024-11-05 11:10:00', 10, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234003', 5, 91, '2024-11-02 12:00:00', '2024-11-02 12:30:00', 30, '919876543210', 'international', 7.50, 1.00, 10.50), -- International
('15551234005', 7, NULL, '2024-11-02 14:00:00', '2024-11-02 14:20:00', 20, '15559876543', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234007', 9, 33, '2024-11-02 16:00:00', '2024-11-02 16:25:00', 25, '33654321789', 'international', 5.00, 0.75, 7.75), -- International
('15551234009', 12, NULL, '2024-11-03 09:00:00', '2024-11-03 09:30:00', 30, '15559987654', 'domestic', NULL, 0.30, 1.50), -- Domestic
('15551234006', 8, 44, '2024-11-03 15:00:00', '2024-11-03 15:40:00', 40, '44123456789', 'international', 8.00, 1.20, 11.20), -- International
('15551234002', 2, NULL, '2024-11-04 10:00:00', '2024-11-04 10:45:00', 45, '15551234567', 'domestic', NULL, 0.45, 0.00), -- Domestic
('15551234010', 15, 81, '2024-11-04 18:00:00', '2024-11-04 18:15:00', 15, '81876543210', 'international', 4.50, 0.60, 6.10), -- International
('15551234004', 4, NULL, '2024-11-05 11:30:00', '2024-11-05 11:50:00', 20, '15559876541', 'domestic', NULL, 0.25, 0.00), -- Domestic
('15551234004', 4, NULL, '2024-11-06 11:30:00', '2024-11-06 11:50:00', 20, '15559876541', 'domestic', NULL, 0.25, 0.00), -- Domestic
('15551234001', 3, 7, '2024-11-05 21:00:00', '2024-11-05 21:20:00', 20, '79876543210', 'international', 6.00, 0.80, 8.80), -- International
('15551234001', 3, NULL, '2024-11-07 10:00:00', '2024-11-07 10:15:00', 15, '15559876545', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234002', 2, 44, '2024-11-07 11:00:00', '2024-11-07 11:40:00', 40, '44123456789', 'international', 8.00, 1.20, 11.20), -- International
('15551234003', 5, NULL, '2024-11-07 12:00:00', '2024-11-07 12:30:00', 30, '15559912345', 'domestic', NULL, 0.75, 3.75), -- Domestic
('15551234004', 4, 91, '2024-11-07 13:00:00', '2024-11-07 13:20:00', 20, '919876543210', 'international', 6.00, 0.80, 8.80), -- International
('15551234005', 7, NULL, '2024-11-07 14:00:00', '2024-11-07 14:25:00', 25, '15559987654', 'domestic', NULL, 0.25, 2.50), -- Domestic
('15551234006', 8, 52, '2024-11-07 15:00:00', '2024-11-07 15:35:00', 35, '525556547890', 'international', 7.50, 1.00, 10.50), -- International
('15551234007', 9, NULL, '2024-11-07 16:00:00', '2024-11-07 16:15:00', 15, '15559912345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234009', 12, 33, '2024-11-07 17:00:00', '2024-11-07 17:30:00', 30, '33654321789', 'international', 5.00, 0.50, 7.50), -- International
('15551234010', 15, NULL, '2024-11-07 18:00:00', '2024-11-07 18:45:00', 45, '15559876541', 'domestic', NULL, 0.45, 4.05), -- Domestic
('15551234567', 1, 81, '2024-11-08 09:00:00', '2024-11-08 09:20:00', 20, '81876543210', 'international', 4.50, 0.60, 6.10), -- International
('15557654321', 1, NULL, '2024-11-08 10:00:00', '2024-11-08 10:30:00', 30, '15551234005', 'domestic', NULL, 0.30, 3.30), -- Domestic
('15551234001', 3, 52, '2024-11-08 11:00:00', '2024-11-08 11:20:00', 20, '525556547890', 'international', 5.00, 0.50, 7.50), -- International
('15551234002', 2, NULL, '2024-11-08 12:00:00', '2024-11-08 12:10:00', 10, '15559912345', 'domestic', NULL, 0.15, 1.15), -- Domestic
('15551234003', 5, 44, '2024-11-08 13:00:00', '2024-11-08 13:30:00', 30, '44123456789', 'international', 6.50, 0.80, 9.30), -- International
('15551234004', 4, NULL, '2024-11-08 14:00:00', '2024-11-08 14:20:00', 20, '15551234567', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234005', 7, NULL, '2024-11-08 15:00:00', '2024-11-08 15:30:00', 30, '15559876543', 'domestic', NULL, 0.30, 1.50), -- Domestic
('15551234006', 8, 91, '2024-11-08 16:00:00', '2024-11-08 16:30:00', 30, '919876543210', 'international', 5.00, 0.75, 7.75), -- International
('15551234007', 9, NULL, '2024-11-08 17:00:00', '2024-11-08 17:20:00', 20, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234009', 12, 33, '2024-11-08 18:00:00', '2024-11-08 18:25:00', 25, '33654321789', 'international', 6.50, 1.00, 8.50), -- International
('15551234010', 15, NULL, '2024-11-09 10:00:00', '2024-11-09 10:30:00', 30, '15559987654', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234567', 1, 81, '2024-11-09 11:00:00', '2024-11-09 11:20:00', 20, '81876543210', 'international', 4.50, 0.60, 6.10), -- International
('15557654321', 2, NULL, '2024-11-09 12:00:00', '2024-11-09 12:15:00', 15, '15559876545', 'domestic', NULL, 0.25, 1.75), -- Domestic
('15551234001', 3, 44, '2024-11-09 13:00:00', '2024-11-09 13:30:00', 30, '44123456789', 'international', 8.00, 1.00, 11.00), -- International
('15551234002', 2, NULL, '2024-11-09 14:00:00', '2024-11-09 14:20:00', 20, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234003', 5, 52, '2024-11-09 15:00:00', '2024-11-09 15:45:00', 45, '525556547890', 'international', 7.50, 1.20, 10.80), -- International
('15551234004', 4, NULL, '2024-11-09 16:00:00', '2024-11-09 16:10:00', 10, '15559876541', 'domestic', NULL, 0.10, 1.10), -- Domestic
('15551234005', 7, 33, '2024-11-09 17:00:00', '2024-11-09 17:30:00', 30, '33654321789', 'international', 6.00, 0.80, 8.80), -- International
('15551234006', 8, NULL, '2024-11-10 09:00:00', '2024-11-10 09:30:00', 30, '15559987654', 'domestic', NULL, 0.30, 1.50), -- Domestic
('15551234007', 9, 81, '2024-11-10 10:00:00', '2024-11-10 10:30:00', 30, '81876543210', 'international', 5.00, 0.75, 7.75), -- International
('15551234009', 12, NULL, '2024-11-10 11:00:00', '2024-11-10 11:20:00', 20, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234010', 15, 52, '2024-11-10 12:00:00', '2024-11-10 12:40:00', 40, '525556547890', 'international', 8.50, 1.50, 12.50), -- International
('15551234567', 1, NULL, '2024-11-10 13:00:00', '2024-11-10 13:15:00', 15, '15559987654', 'domestic', NULL, 0.15, 1.15), -- Domestic
('15557654321', 2, 91, '2024-11-10 14:00:00', '2024-11-10 14:30:00', 30, '919876543210', 'international', 7.50, 1.20, 10.80), -- International
('15551234001', 3, NULL, '2024-11-10 15:00:00', '2024-11-10 15:20:00', 20, '15559876543', 'domestic', NULL, 0.25, 2.25), -- Domestic
('15551234002', 2, 81, '2024-11-10 16:00:00', '2024-11-10 16:45:00', 45, '81876543210', 'international', 9.00, 2.00, 13.00), -- International
('15551234006', 8, NULL, '2024-11-11 09:00:00', '2024-11-11 09:20:00', 20, '15559876543', 'domestic', NULL, 0.25, 2.25), -- Domestic
('15551234006', 8, 91, '2024-11-11 10:00:00', '2024-11-11 10:40:00', 40, '919876543210', 'international', 8.50, 1.00, 12.00), -- International
('15551234006', 8, NULL, '2024-11-12 09:00:00', '2024-11-12 09:10:00', 10, '15559812345', 'domestic', NULL, 0.15, 1.15), -- Domestic
('15551234006', 8, 52, '2024-11-12 10:00:00', '2024-11-12 10:35:00', 35, '525556547890', 'international', 7.00, 1.20, 10.20), -- International
('15551234007', 9, NULL, '2024-11-11 11:00:00', '2024-11-11 11:25:00', 25, '15559987654', 'domestic', NULL, 0.30, 1.80), -- Domestic
('15551234007', 9, 33, '2024-11-11 12:00:00', '2024-11-11 12:30:00', 30, '33654321789', 'international', 6.50, 1.00, 9.50), -- International
('15551234007', 9, NULL, '2024-11-12 13:00:00', '2024-11-12 13:15:00', 15, '15559876543', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234007', 9, 44, '2024-11-12 14:00:00', '2024-11-12 14:40:00', 40, '44123456789', 'international', 8.00, 1.50, 11.50), -- International
('15551234008', 10, NULL, '2024-11-11 15:00:00', '2024-11-11 15:20:00', 20, '15559812345', 'domestic', NULL, 0.25, 2.25), -- Domestic
('15551234008', 10, 91, '2024-11-11 16:00:00', '2024-11-11 16:30:00', 30, '919876543210', 'international', 6.50, 1.00, 9.50), -- International
('15551234008', 10, NULL, '2024-11-12 17:00:00', '2024-11-12 17:30:00', 30, '15559876541', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234008', 10, 52, '2024-11-12 18:00:00', '2024-11-12 18:35:00', 35, '525556547890', 'international', 7.50, 1.20, 10.70), -- International
('15551234009', 12, NULL, '2024-11-13 09:00:00', '2024-11-13 09:30:00', 30, '15559912345', 'domestic', NULL, 0.30, 1.50), -- Domestic
('15551234009', 12, 33, '2024-11-13 10:00:00', '2024-11-13 10:30:00', 30, '33654321789', 'international', 6.00, 0.75, 8.75), -- International
('15551234009', 12, NULL, '2024-11-13 11:00:00', '2024-11-13 11:25:00', 25, '15559812345', 'domestic', NULL, 0.25, 2.25), -- Domestic
('15551234009', 12, 81, '2024-11-13 12:00:00', '2024-11-13 12:45:00', 45, '81876543210', 'international', 9.00, 1.50, 12.50), -- International
('15551234010', 15, NULL, '2024-11-13 13:00:00', '2024-11-13 13:20:00', 20, '15559876541', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234010', 15, 52, '2024-11-13 14:00:00', '2024-11-13 14:35:00', 35, '525556547890', 'international', 8.00, 1.00, 11.00), -- International
('15551234010', 15, NULL, '2024-11-13 15:00:00', '2024-11-13 15:45:00', 45, '15559987654', 'domestic', NULL, 0.45, 2.25), -- Domestic
('15551234010', 15, 91, '2024-11-13 16:00:00', '2024-11-13 16:25:00', 25, '919876543210', 'international', 7.50, 1.50, 10.00), -- International
('15551234011', 16, NULL, '2024-11-14 09:00:00', '2024-11-14 09:25:00', 25, '15559876543', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234011', 16, 33, '2024-11-14 10:00:00', '2024-11-14 10:30:00', 30, '33654321789', 'international', 6.50, 1.20, 9.50), -- International
('15551234011', 16, NULL, '2024-11-14 11:00:00', '2024-11-14 11:10:00', 10, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234011', 16, 91, '2024-11-14 12:00:00', '2024-11-14 12:30:00', 30, '919876543210', 'international', 8.00, 1.00, 11.00), -- International
('15551234012', 17, NULL, '2024-11-14 13:00:00', '2024-11-14 13:20:00', 20, '15559987654', 'domestic', NULL, 0.25, 1.75), -- Domestic
('15551234012', 17, 44, '2024-11-14 14:00:00', '2024-11-14 14:45:00', 45, '44123456789', 'international', 9.00, 1.50, 12.50), -- International
('15551234012', 17, NULL, '2024-11-15 09:00:00', '2024-11-15 09:15:00', 15, '15559876543', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234012', 17, 52, '2024-11-15 10:00:00', '2024-11-15 10:30:00', 30, '525556547890', 'international', 7.50, 1.20, 10.80), -- International
('15551234011', 16, NULL, '2024-11-15 11:00:00', '2024-11-15 11:30:00', 30, '15559812345', 'domestic', NULL, 0.25, 1.75), -- Domestic
('15551234011', 16, 81, '2024-11-15 12:00:00', '2024-11-15 12:40:00', 40, '81876543210', 'international', 8.50, 1.50, 12.50), -- International
('15551234012', 17, NULL, '2024-11-15 13:00:00', '2024-11-15 13:20:00', 20, '15559987654', 'domestic', NULL, 0.30, 2.30), -- Domestic
('15551234012', 17, 91, '2024-11-15 14:00:00', '2024-11-15 14:30:00', 30, '919876543210', 'international', 6.50, 1.00, 9.50), -- International
('15551234012', 17, NULL, '2024-11-16 09:00:00', '2024-11-16 09:25:00', 25, '15559876543', 'domestic', NULL, 0.50, 2.50), -- Domestic
('15551234012', 17, 33, '2024-11-16 10:00:00', '2024-11-16 10:30:00', 30, '33654321789', 'international', 6.00, 1.00, 9.00), -- International
('15551234013', 18, NULL, '2024-11-16 11:00:00', '2024-11-16 11:15:00', 15, '15559876543', 'domestic', NULL, 0.25, 1.25), -- Domestic
('15551234013', 18, 44, '2024-11-16 12:00:00', '2024-11-16 12:30:00', 30, '44123456789', 'international', 7.50, 1.20, 10.80), -- International
('15551234014', 19, NULL, '2024-11-16 13:00:00', '2024-11-16 13:25:00', 25, '15559987654', 'domestic', NULL, 0.25, 1.75), -- Domestic
('15551234014', 19, 91, '2024-11-16 14:00:00', '2024-11-16 14:30:00', 30, '919876543210', 'international', 6.50, 1.50, 9.50), -- International
('15551234015', 20, NULL, '2024-11-17 09:00:00', '2024-11-17 09:20:00', 20, '15559812345', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234015', 20, 52, '2024-11-17 10:00:00', '2024-11-17 10:45:00', 45, '525556547890', 'international', 8.50, 1.50, 12.50), -- International
('15551234016', 21, NULL, '2024-11-17 11:00:00', '2024-11-17 11:30:00', 30, '15559876541', 'domestic', NULL, 0.30, 1.50), -- Domestic
('15551234016', 21, 81, '2024-11-17 12:00:00', '2024-11-17 12:40:00', 40, '81876543210', 'international', 7.50, 1.50, 11.50), -- International
('15551234017', 22, NULL, '2024-11-17 13:00:00', '2024-11-17 13:25:00', 25, '15559876543', 'domestic', NULL, 0.25, 1.75), -- Domestic
('15551234017', 22, 33, '2024-11-17 14:00:00', '2024-11-17 14:30:00', 30, '33654321789', 'international', 6.50, 1.00, 9.50), -- International
('15551234018', 23, NULL, '2024-11-17 15:00:00', '2024-11-17 15:30:00', 30, '15559812345', 'domestic', NULL, 0.25, 2.25), -- Domestic
('15551234018', 23, 44, '2024-11-17 16:00:00', '2024-11-17 16:40:00', 40, '44123456789', 'international', 8.50, 1.50, 12.50), -- International
('15551234019', 24, NULL, '2024-11-17 17:00:00', '2024-11-17 17:20:00', 20, '15559876541', 'domestic', NULL, 0.20, 1.20), -- Domestic
('15551234019', 24, 91, '2024-11-17 18:00:00', '2024-11-17 18:30:00', 30, '919876543210', 'international', 6.50, 1.50, 9.50), -- International
('15551234020', 25, NULL, '2024-11-18 09:00:00', '2024-11-18 09:15:00', 15, '15559876543', 'domestic', NULL, 0.15, 1.15), -- Domestic
('15551234020', 25, 52, '2024-11-18 10:00:00', '2024-11-18 10:30:00', 30, '525556547890', 'international', 7.50, 1.00, 10.00); -- International

-- Insert data into sms_log
INSERT INTO sms_log (phone_number, time, area_id, country_code, char_count, to_number, roaming_cost, discount, total_cost) VALUES
('15551234567', '2024-11-01 12:00:00', 1, NULL, 160, '15559876543', NULL, 0.00, 1.60), -- Domestic
('15557654321', '2024-11-02 14:30:00', 2, 52, 200, '52559876543', 0.50, 0.10, 2.50), -- International
('15551234001', '2024-11-03 16:45:00', 3, 7, 120, '44123456789', 0.25, 0.05, 1.20), -- International
('15551234002', '2024-11-03 18:00:00', 4, NULL, 180, '15557654321', NULL, 0.00, 0.00), -- Domestic
('15551234003', '2024-11-04 10:15:00', 5, 44, 140, '919876543210', 0.30, 0.10, 1.60), -- International
('15551234004', '2024-11-04 12:50:00', 6, NULL, 160, '15559876541', NULL, 0.00, 0.00), -- Domestic
('15551234005', '2024-11-05 09:30:00', 7, 81, 250, '33654321789', 0.40, 0.15, 2.75), -- International
('15551234006', '2024-11-05 11:10:00', 8, NULL, 300, '15559987654', NULL, 0.00, 0.00), -- Domestic
('15551234007', '2024-11-06 14:00:00', 9, 7, 100, '79876543210', 0.20, 0.05, 1.15), -- International
('15551234008', '2024-11-06 15:45:00', 10, NULL, 160, '81876543210', NULL, 0.00, 1.60), -- Domestic
('15551234009', '2024-11-07 08:15:00', 11, NULL, 200, '15559812345', NULL, 0.00, 2.00), -- Domestic
('15551234010', '2024-11-07 20:30:00', 12, 52, 220, '44123456789', 0.35, 0.05, 2.50); -- International

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
