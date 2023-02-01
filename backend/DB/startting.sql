DROP DATABASE IF EXISTS usersys;
CREATE DATABASE usersys;
USE usersys;

DROP USER IF EXISTS 'usersys'@'localhost';
CREATE USER 'usersys'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyPassword1!';
GRANT ALL PRIVILEGES ON usersys.* TO 'usersys'@'localhost';

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  displayName VARCHAR(255) NOT NULL,
  profileImage VARCHAR(255)
);