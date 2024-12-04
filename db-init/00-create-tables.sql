-- Table: company_bank
CREATE TABLE IF NOT EXISTS company_bank (
    bank_account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(255),
    account_number VARCHAR(20),
    routing_number VARCHAR(20),
    balance DECIMAL(15, 2)
);

-- Table: customer
CREATE TABLE IF NOT EXISTS customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    email_advertise_agree BOOLEAN,
    date_of_birth DATE,
    zip_code VARCHAR(10),
    password VARCHAR(255),
    created_time TIMESTAMP
);

-- Table: transaction
CREATE TABLE IF NOT EXISTS transaction (
    transaction_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type VARCHAR(50) NOT NULL, -- charge/payment/auto
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

-- Table: phone_plan (prepaid, postpaid, unlimited, travel)
CREATE TABLE IF NOT EXISTS phone_plan (
    plan_id SERIAL PRIMARY KEY,
    plan_name VARCHAR(255),
    rate_per_minute DECIMAL(10, 2),
    rate_per_MB DECIMAL(10, 2),
    rate_per_char DECIMAL(10, 2),
    MBs_soft_cap DECIMAL(10, 2),
    MBs_hard_cap DECIMAL(10, 2),
    international_rate DECIMAL(10,2),
    plan_type VARCHAR(10) CHECK (plan_type IN ('prepaid', 'postpaid', 'unlimited', 'travel')),
    monthly_charge DECIMAL(15, 2)
);

-- Table: promotion
CREATE TABLE IF NOT EXISTS promotion (
    promotion_id SERIAL PRIMARY KEY,
    promotion_name VARCHAR(255) NOT NULL,
    discount_code VARCHAR(50) UNIQUE,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) CHECK (discount_value > 0),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    min_subscription_duration INT CHECK (min_subscription_duration >= 0),
    min_spending DECIMAL(15, 2) CHECK (min_spending >= 0),
    applicable_plan_id INT,
    previous_provider_require BOOLEAN NOT NULL,
    FOREIGN KEY (applicable_plan_id) REFERENCES phone_plan(plan_id),
    CONSTRAINT check_promotion_dates CHECK (end_date >= start_date)
);

-- Table: bank_account
CREATE TABLE IF NOT EXISTS bank_account (
    bank_account_id SERIAL PRIMARY KEY,
    customer_id INT,
    card_number VARCHAR(16),
    name VARCHAR(255),
    exp_date DATE,
    cvv VARCHAR(4),
    balance DECIMAL(15, 2),
    default_flag BOOLEAN,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

-- Table: phone_number_list
CREATE TABLE IF NOT EXISTS phone_number_list (
    phone_number VARCHAR(20) PRIMARY KEY,
    customer_id INT,
    is_primary BOOLEAN,
    added_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

-- Table: subscription
CREATE TABLE IF NOT EXISTS subscription (
    subscription_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    active BOOLEAN NOT NULL,
    promotion_id INT,
    prepaid_balance DECIMAL(15, 2) CHECK (prepaid_balance >= 0), -- Only for prepaid
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES phone_plan(plan_id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id)
);

-- Table: billing_cycle
CREATE TABLE IF NOT EXISTS billing_cycle (
    subscription_id INT,
    billing_date DATE,
    start_date DATE,
    end_date DATE,
    subscription_charge DECIMAL(15, 2) CHECK (subscription_charge >= 0), -- Monthly subscription cost
    call_charge DECIMAL(15, 2),
    sms_charge DECIMAL(15, 2),
    data_charge DECIMAL(15, 2), -- Domestic + international data cost
    tax DECIMAL(15, 2),
    total_charge DECIMAL(15, 2) CHECK (total_charge >= 0), -- Sum of all charges
    status VARCHAR(10) NOT NULL CHECK (status IN ('paid', 'unpaid', 'overdue')),
    PRIMARY KEY (subscription_id, start_date),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE
);

-- Table: home_area
CREATE TABLE IF NOT EXISTS home_area (
    area_id SERIAL PRIMARY KEY,
    zipcode VARCHAR(10),
    city VARCHAR(255),
    state VARCHAR(50),
    active BOOLEAN
); 

-- Table: international_code
CREATE TABLE IF NOT EXISTS international_code (
    country_code SERIAL PRIMARY KEY,
    country_name VARCHAR(255),
    rate_per_min DECIMAL(10, 2),
    sms_rate DECIMAL(10, 2)
);

-- Table: partner_provider
CREATE TABLE IF NOT EXISTS partner_provider (
    provider_id SERIAL PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL,
    country_code INT NOT NULL,
    FOREIGN KEY (country_code) REFERENCES international_code(country_code)
);

-- Table: data_usage
CREATE TABLE IF NOT EXISTS data_usage (
    phone_number VARCHAR(20), 
    month DATE, -- new row add each mont
    data_used DECIMAL(15, 2) CHECK (data_used >= 0), -- Domestic data usage
    cost DECIMAL(15, 2) CHECK (cost >= 0), -- Cost for domestic usage
    PRIMARY KEY(phone_number, month),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number)
);

-- Table: international_data_usage
CREATE TABLE IF NOT EXISTS international_data_usage (
    phone_number VARCHAR(20),
    month DATE, -- new row add each month
    data_used DECIMAL(15, 2) CHECK (data_used >= 0), -- International data usage
    cost DECIMAL(15, 2) CHECK (cost >= 0), -- Total cost for international usage
    PRIMARY KEY(phone_number, month),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number)
);

-- Table: call_log
CREATE TABLE IF NOT EXISTS call_log (
    call_id SERIAL PRIMARY KEY,
    from_phone_number VARCHAR(20) NOT NULL,
    area_id INT,
    country_code INT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration INT CHECK (duration >= 0),
    to_number VARCHAR(20) NOT NULL,
    call_type VARCHAR(20) NOT NULL CHECK (call_type IN ('domestic', 'international')),
    roaming_cost DECIMAL(15, 2) CHECK (roaming_cost >= 0),
    discount DECIMAL(10, 2) CHECK (discount >= 0),
    total_cost DECIMAL(15, 2) CHECK (total_cost >= 0),
    FOREIGN KEY (from_phone_number) REFERENCES phone_number_list(phone_number) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES home_area(area_id),
    FOREIGN KEY (country_code) REFERENCES international_code(country_code),
    CONSTRAINT check_call_type_country_code CHECK (
    (call_type = 'domestic' AND country_code IS NULL) OR 
    (call_type = 'international' AND country_code IS NOT NULL)
)
);

-- Table: sms_log
CREATE TABLE IF NOT EXISTS sms_log (
    phone_number VARCHAR(20) NOT NULL,
    time TIMESTAMP NOT NULL,
    area_id INT,
    country_code INT,
    char_count INT CHECK (char_count > 0),
    to_number VARCHAR(20) NOT NULL,
    roaming_cost DECIMAL(15, 2) CHECK (roaming_cost >= 0),
    discount DECIMAL(10, 2) CHECK (discount >= 0),
    total_cost DECIMAL(15, 2) CHECK (total_cost >= 0),
    PRIMARY KEY (phone_number, time),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number),
    FOREIGN KEY (area_id) REFERENCES home_area(area_id),
    FOREIGN KEY (country_code) REFERENCES international_code(country_code)
);

-- Table: call_transit (for call while moving between 2 area)
CREATE TABLE IF NOT EXISTS call_transit (
    transit_id SERIAL PRIMARY KEY,
    call_id INT,
    from_area INT,
    to_area INT,
    transit_time TIMESTAMP,
    FOREIGN KEY (call_id) REFERENCES call_log(call_id),
    FOREIGN KEY (from_area) REFERENCES home_area(area_id),
    FOREIGN KEY (to_area) REFERENCES home_area(area_id),
    CONSTRAINT check_area_difference CHECK (from_area <> to_area)
);

-- Indexing Part

-- Indexes for customer
CREATE INDEX IF NOT EXISTS idx_customer_first_name ON customer(first_name);
CREATE INDEX IF NOT EXISTS idx_customer_last_name ON customer(last_name);
CREATE INDEX IF NOT EXISTS idx_customer_email ON customer(email);
CREATE INDEX IF NOT EXISTS idx_customer_created_time ON customer(created_time);

-- Indexes for transaction
CREATE INDEX IF NOT EXISTS idx_transaction_customer_id ON transaction(customer_id);
CREATE INDEX IF NOT EXISTS idx_transaction_transaction_date ON transaction(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transaction_transaction_type ON transaction(transaction_type);

-- Indexes for phone_plan
CREATE INDEX IF NOT EXISTS idx_phone_plan_plan_id ON phone_plan(plan_id);
CREATE INDEX IF NOT EXISTS idx_phone_plan_name ON phone_plan(plan_name);
CREATE INDEX IF NOT EXISTS idx_phone_plan_plan_type ON phone_plan(plan_type);
CREATE INDEX IF NOT EXISTS idx_phone_plan_monthly_charge ON phone_plan(monthly_charge);

-- Indexes for promotion
CREATE INDEX IF NOT EXISTS idx_promotion_start_date ON promotion(start_date);
CREATE INDEX IF NOT EXISTS idx_promotion_end_date ON promotion(end_date);
CREATE INDEX IF NOT EXISTS idx_promotion_applicable_plan_id ON promotion(applicable_plan_id);

-- Indexes for bank_account
CREATE INDEX IF NOT EXISTS idx_bank_account_customer_id ON bank_account(customer_id);
CREATE INDEX IF NOT EXISTS idx_bank_account_balance ON bank_account(balance);
CREATE INDEX IF NOT EXISTS idx_bank_account_card_number ON bank_account(card_number);

-- Indexes for phone_number_list
CREATE INDEX IF NOT EXISTS idx_phone_number_list_phone_number ON phone_number_list(phone_number);
CREATE INDEX IF NOT EXISTS idx_phone_number_list_customer_is_primary ON phone_number_list(customer_id, is_primary);

-- Indexes for subscription
CREATE INDEX IF NOT EXISTS idx_subscription_customer_id ON subscription(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscription_plan_id_active ON subscription(plan_id, active);
CREATE INDEX IF NOT EXISTS idx_subscription_start_date ON subscription(start_date);

-- Indexes for billing_cycle
CREATE INDEX IF NOT EXISTS idx_billing_cycle_subscription_status ON billing_cycle(subscription_id, status);

-- Indexes for home_area
CREATE INDEX IF NOT EXISTS idx_home_area_zipcode ON home_area(zipcode);
CREATE INDEX IF NOT EXISTS idx_home_area_active ON home_area(active);

-- Indexes for international_code
CREATE INDEX IF NOT EXISTS idx_international_code_country_name ON international_code(country_name);

-- Indexes for partner_provider
CREATE INDEX IF NOT EXISTS idx_partner_provider_country_code ON partner_provider(country_code);

-- Indexes for data_usage
CREATE INDEX IF NOT EXISTS idx_data_usage_phone_month ON data_usage(phone_number, month);

-- Indexes for international_data_usage
CREATE INDEX IF NOT EXISTS idx_international_data_usage_phone_month ON international_data_usage(phone_number, month);

-- Indexes for call_log
CREATE INDEX IF NOT EXISTS idx_call_log_call_id ON call_log(call_id);
CREATE INDEX IF NOT EXISTS idx_call_log_end_time ON call_log(end_time);
CREATE INDEX IF NOT EXISTS idx_call_log_from_phone_number ON call_log(from_phone_number);
CREATE INDEX IF NOT EXISTS idx_call_log_start_time ON call_log(start_time);

-- Indexes for sms_log
CREATE INDEX IF NOT EXISTS idx_sms_log_time ON sms_log(time);
CREATE INDEX IF NOT EXISTS idx_sms_log_area_id ON sms_log(area_id);
CREATE INDEX IF NOT EXISTS idx_sms_log_country_code ON sms_log(country_code);

-- Indexes for call_transit
CREATE INDEX IF NOT EXISTS idx_call_transit_call_id ON call_transit(call_id);
CREATE INDEX IF NOT EXISTS idx_call_transit_from_area ON call_transit(from_area);
CREATE INDEX IF NOT EXISTS idx_call_transit_to_area ON call_transit(to_area);
