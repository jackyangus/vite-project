-- Initialize database for Mercury
-- Create tables if not exists (backup to application's Hibernate auto-ddl)
-- The application's JPA will handle most schema creation, this is just a fallback

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    username VARCHAR(255),
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP
);

-- OAuth identities table
CREATE TABLE IF NOT EXISTS user_oauth_identities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    provider_name VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    profile_data TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_provider_user (provider_name, provider_user_id)
);

-- Translation requests table
CREATE TABLE IF NOT EXISTS translation_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    original_text TEXT NOT NULL,
    translated_text TEXT,
    status VARCHAR(20) NOT NULL,
    error_message VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    translation_completed_at TIMESTAMP,
    characters_processed INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 