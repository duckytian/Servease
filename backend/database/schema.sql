
CREATE DATABASE IF NOT EXISTS servease CHARACTER SET utf8mb4;
USE servease;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS request_status_history;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL UNIQUE,      
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  contact_number VARCHAR(20),
  course VARCHAR(50),
  year_level VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','osas','it','registrar') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department ENUM('osas','it','registrar') NOT NULL,
  name VARCHAR(120) NOT NULL,
  code VARCHAR(20),
  description VARCHAR(255),
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uq_dept_name (department, name),
  UNIQUE KEY uq_dept_code (department, code)
);

CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ref VARCHAR(30) UNIQUE,                     
  department ENUM('osas','it','registrar') NOT NULL,
  student_id INT NOT NULL,
  service_id INT NOT NULL,
  academic_year VARCHAR(20),
  semester VARCHAR(30),
  purpose TEXT NOT NULL,
  additional_remarks TEXT,                     
  status ENUM('Pending','Processing','Completed','Rejected') NOT NULL DEFAULT 'Pending',
  assigned_staff VARCHAR(120),                 
  remarks TEXT,                             
  remarks_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  INDEX idx_dept_status (department, status)
);

CREATE TABLE request_status_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  step VARCHAR(80) NOT NULL,                
  status ENUM('Pending','Processing','Completed','Rejected') NOT NULL,
  note TEXT,
  updated_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Spec-aligned service catalog (SERVEASE overview).
INSERT INTO services (department, name, code, description) VALUES
 ('osas','Report Lost Student ID','LOST ID','Report a lost student ID and start the replacement process.'),
 ('osas','Student ID Replacement','STUDENT ID','Request a replacement for a lost or damaged student ID.'),
 ('registrar','Certificate of Enrollment (COE)','COE','Official proof of enrollment for the current academic term.'),
 ('registrar','Certificate of Grades (COG)','COG','Certified copy of your grades for scholarships and requirements.'),
 ('registrar','Transcript of Records (TOR)','TOR','Complete academic record for transfer, employment, or further study.'),
 ('registrar','Good Moral Certificate','GOOD MORAL','Certification of good character and student conduct.'),
 ('it','Student Portal Assistance','PORTAL','Assistance with student portal access and account issues.'),
 ('it','Computer Lab Request','LAB','Request access or resources for the computer lab.');
