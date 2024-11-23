-- Table: company_bank
CREATE TABLE IF NOT EXISTS company_bank (
    bank_account_id INT PRIMARY KEY,
    account_name VARCHAR(255),
    account_number VARCHAR(20),
    routing_number VARCHAR(20),
    balance DECIMAL(15, 2)
);

-- Table: bank_account
CREATE TABLE IF NOT EXISTS bank_account (
    bank_account_id INT PRIMARY KEY,
    customer_id INT,
    card_number VARCHAR(16),
    name VARCHAR(255),
    exp_date DATE,
    cvv VARCHAR(4),
    balance DECIMAL(15, 2),
    default_flag BOOLEAN,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

-- Table: customer
CREATE TABLE IF NOT EXISTS customer (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255),
    email_advertise_agree BOOLEAN,
    date_of_birth DATE,
    zip_code VARCHAR(10),
    password VARCHAR(255),
    created_time TIMESTAMP
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
    subscription_id INT PRIMARY KEY,
    customer_id INT,
    plan_id INT,
    start_date DATE,
    end_date DATE,
    active BOOLEAN,
    promotion_id INT,
    prepaid_balance DECIMAL(15, 2),-- only for prepaid, null for others
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES phone_plan(plan_id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id)
);

-- Table: phone_plan (prepaid, postpaid, unlimited, travel)
CREATE TABLE IF NOT EXISTS phone_plan (
    plan_id INT PRIMARY KEY,
    plan_name VARCHAR(255),
    rate_per_minute DECIMAL(10, 2),
    rate_per_MB DECIMAL(10, 2),
    rate_per_char DECIMAL(10, 2),
    MBs_per_pack INT,
    MBs_pack_cost DECIMAL(10, 2),
    plan_type ENUM('prepaid', 'postpaid', 'unlimited', 'travel'),
    monthly_charge DECIMAL(15, 2)
);

-- Table: promotion
CREATE TABLE IF NOT EXISTS promotion (
    promotion_id INT PRIMARY KEY,
    promotion_name VARCHAR(255),
    discount_code VARCHAR(50),
    discount_type ENUM('percentage', 'fixed'),
    discount_value DECIMAL(10, 2),
    start_date DATE,
    end_date DATE,
    min_subscription_duration INT,
    min_spending DECIMAL(15, 2),
    applicable_plan_id INT,
    previous_provider_require BOOLEAN,
    FOREIGN KEY (applicable_plan_id) REFERENCES phone_plan(plan_id)
);

-- Table: billing_cycle
CREATE TABLE IF NOT EXISTS billing_cycle (
    subscription_id INT PRIMARY KEY,
    start_date DATE,
    billing_date DATE,
    end_date DATE,
    call_charge DECIMAL(15, 2),
    sms_charge DECIMAL(15, 2),
    unlimited_data_charge DECIMAL(15, 2),
    total_charge DECIMAL(15, 2),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE
);

-- Table: data_usage
CREATE TABLE IF NOT EXISTS data_usage (
    subscription_id INT,
    date DATE,
    data_used DECIMAL(15, 2),
    cost DECIMAL(15, 2),
    PRIMARY KEY (subscription_id, date),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE
);

-- Table: international_data_usage
CREATE TABLE IF NOT EXISTS international_data_usage (
    session_id INT PRIMARY KEY,
    subscription_id INT,
    country_code VARCHAR(10),
    provider_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    data_used DECIMAL(15, 2),
    cost DECIMAL(15, 2),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE,
    FOREIGN KEY (country_code) REFERENCES international_code(country_code),
    FOREIGN KEY (provider_id) REFERENCES partner_provider(provider_id)
);

-- Table: international_code
CREATE TABLE IF NOT EXISTS international_code (
    country_code VARCHAR(10) PRIMARY KEY,
    country_name VARCHAR(255),
    rate_per_min DECIMAL(10, 2),
    sms_rate DECIMAL(10, 2),
    rate_per_MBs DECIMAL(10, 2)
);

-- Table: partner_provider
CREATE TABLE IF NOT EXISTS partner_provider (
    provider_id INT PRIMARY KEY,
    provider_name VARCHAR(255),
    country_code VARCHAR(10),
    FOREIGN KEY (country_code) REFERENCES international_code(country_code)
);

-- Table: call_log
CREATE TABLE IF NOT EXISTS call_log (
    call_id INT PRIMARY KEY,
    from_phone_number INT,
    area_id INT,
    country_code VARCHAR(10),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    duration INT,
    to_number VARCHAR(20),
    call_type ENUM('domestic', 'international'),
    roaming_cost DECIMAL(15, 2), --null for domestic
    discount DECIMAL(10, 2),
    total_cost DECIMAL(15, 2),
    FOREIGN KEY (from_phone_number) REFERENCES phone_number_list(phone_number) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES home_area(area_id),
    FOREIGN KEY (country_code) REFERENCES international_code(country_code)
);

-- Table: sms_log
CREATE TABLE IF NOT EXISTS sms_log (
    subscription_id INT,
    time TIMESTAMP,
    from_number INT,
    area_id INT,
    char_count INT,
    to_number VARCHAR(20),
    roaming_cost DECIMAL(15, 2),
    discount DECIMAL(10, 2),
    total_cost DECIMAL(15, 2),
    PRIMARY KEY (subscription_id, time),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE,
    FOREIGN KEY (from_number) REFERENCES phone_number_list(phone_number) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES home_area(area_id)
);

-- Table: home_area
CREATE TABLE IF NOT EXISTS home_area (
    area_id INT PRIMARY KEY,
    zipcode VARCHAR(10),
    city VARCHAR(255),
    state VARCHAR(50),
    active BOOLEAN
);

-- Table: call_transit (for call while moving between 2 area)
CREATE TABLE IF NOT EXISTS call_transit (
    transit_id INT PRIMARY KEY,
    call_id INT,
    from_area INT,
    to_area INT,
    transit_time TIMESTAMP,
    FOREIGN KEY (call_id) REFERENCES call_log(call_id),
    FOREIGN KEY (from_area) REFERENCES home_area(area_id),
    FOREIGN KEY (to_area) REFERENCES home_area(area_id)
);
