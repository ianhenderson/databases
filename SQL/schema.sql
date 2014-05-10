CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  roomname VARCHAR(100) NOT NULL,
  text VARCHAR(500) NOT NULL,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
