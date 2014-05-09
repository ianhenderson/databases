CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  username VARCHAR(100)
);

CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY,
  roomname VARCHAR(100)
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY,
  text VARCHAR(500)
);

INSERT INTO users(id, username) VALUES (1, 'nick');
INSERT INTO rooms(id, roomname) VALUES (1, 'lobby1');
INSERT INTO messages(id, text) VALUES (1, 'my first SQL message!');
INSERT INTO users(id, username) VALUES (2, 'nick');
INSERT INTO rooms(id, roomname) VALUES (2, 'lobby2');
INSERT INTO messages(id, text) VALUES (2, 'my second SQL message!');

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
