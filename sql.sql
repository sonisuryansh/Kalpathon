CREATE DATABASE IF NOT EXISTS gov_scheme;

USE gov_scheme;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    provider VARCHAR(50),
    oauth_id VARCHAR(255)
);