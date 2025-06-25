CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO students (name, email, course) VALUES
('John Smith', 'aa@gmail.com', 'csci300'),
('Jane Doe', '456@gmail.com', 'csci400');