CREATE DATABASE IF NOT EXISTS blood_bank;
USE blood_bank;

CREATE TABLE donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  blood_type VARCHAR(5),
  contact_number VARCHAR(20),
  last_donation DATE
);
SHOW DATABASES;
USE blood_bank;
SHOW TABLES;
