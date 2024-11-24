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

-- Table: phone_plan (prepaid, postpaid, unlimited, travel)
CREATE TABLE IF NOT EXISTS phone_plan (
    plan_id INT PRIMARY KEY,
    plan_name VARCHAR(255),
    rate_per_minute DECIMAL(10, 2),
    rate_per_MB DECIMAL(10, 2),
    rate_per_char DECIMAL(10, 2),
    MBs_soft_cap DECIMAL(10, 2),
    MBs_hard_cap DECIMAL(10, 2),
    plan_type VARCHAR(10) CHECK (plan_type IN ('prepaid', 'postpaid', 'unlimited', 'travel')),
    monthly_charge DECIMAL(15, 2)
);

-- Table: promotion
CREATE TABLE IF NOT EXISTS promotion (
    promotion_id INT PRIMARY KEY,
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

-- Table: billing_cycle
CREATE TABLE IF NOT EXISTS billing_cycle (
    subscription_id INT,
    billing_date DATE,
    start_date DATE,
    end_date DATE,
    call_charge DECIMAL(15, 2),
    sms_charge DECIMAL(15, 2),
    unlimited_data_charge DECIMAL(15, 2),
    total_charge DECIMAL(15, 2),
    PRIMARY KEY (subscription_id, billing_date),
    FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE
);

-- Table: data_usage
CREATE TABLE IF NOT EXISTS data_usage (
    phone_number VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    data_used DECIMAL(15, 2) CHECK (data_used >= 0),
    cost DECIMAL(15, 2) CHECK (cost >= 0),
    PRIMARY KEY (phone_number, date),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number)
);


-- Table: international_data_usage
CREATE TABLE IF NOT EXISTS international_data_usage (
    phone_number VARCHAR(20) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    country_code INT NOT NULL,
    provider_id INT NOT NULL,
    end_time TIMESTAMP NOT NULL,
    data_used DECIMAL(15, 2) CHECK (data_used >= 0),
    cost DECIMAL(15, 2) CHECK (cost >= 0),
    PRIMARY KEY (phone_number, start_time),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number),
    FOREIGN KEY (country_code) REFERENCES international_code(country_code),
    FOREIGN KEY (provider_id) REFERENCES partner_provider(provider_id) ON DELETE CASCADE
);


-- Table: international_code
CREATE TABLE IF NOT EXISTS international_code (
    country_code INT PRIMARY KEY,
    country_name VARCHAR(255),
    rate_per_min DECIMAL(10, 2),
    sms_rate DECIMAL(10, 2),
    rate_per_MBs DECIMAL(10, 2)
);

-- Table: partner_provider
CREATE TABLE IF NOT EXISTS partner_provider (
    provider_id INT PRIMARY KEY,
    provider_name VARCHAR(255) NOT NULL,
    country_code INT NOT NULL,
    FOREIGN KEY (country_code) REFERENCES international_code(country_code)
);


-- Table: call_log
CREATE TABLE IF NOT EXISTS call_log (
    call_id INT PRIMARY KEY,
    from_phone_number VARCHAR(20) NOT NULL,
    area_id INT,
    country_code INT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
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
    char_count INT CHECK (char_count > 0),
    to_number VARCHAR(20) NOT NULL,
    roaming_cost DECIMAL(15, 2) CHECK (roaming_cost >= 0),
    discount DECIMAL(10, 2) CHECK (discount >= 0),
    total_cost DECIMAL(15, 2) CHECK (total_cost >= 0),
    PRIMARY KEY (phone_number, time),
    FOREIGN KEY (phone_number) REFERENCES phone_number_list(phone_number),
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
    FOREIGN KEY (to_area) REFERENCES home_area(area_id),
    CONSTRAINT check_area_difference CHECK (from_area <> to_area)
);
