var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  // user: "ian&nick",
  user: "root",
  password: "",
  database: "chat"
});

// dbConnection.query("insert into users (username, roomname, text) values ('root', 'lobby', 'hellooooooo')", function(err, rows) {
//   console.log(rows.insertId);
// });

// dbConnection.query('SELECT username FROM users', function(err, rows){
//   console.log(rows);
// });
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

// This will replace every "'" with "''" to avoid errors in the SQL insert.
module.exports.cleanString = function(obj){
  for (var key in obj){
    if (typeof obj[key] === 'string'){
      obj[key] = obj[key].replace(/'/, "''");
    }
  }
};


module.exports.readDatabase = function(callback) {
  var query = "select * from users order by id desc";
  dbConnection.query(query, function(err, rows){
    if (err) {
      console.log("err reading from DB: ", err);
    } else {
      callback(rows);
    }
  });
};

module.exports.writeDatabase = function(message, callback) {
  console.log("Message :", message);
  module.exports.cleanString(message);
  var query = 'insert into users (username, roomname, text) values ("'
    + message.username + '","' + message.roomname + '","' + message.text
    + '")';
console.log("Query", query);
  dbConnection.query(query, function(err, rows) {
    if (err) {
      console.log("err writing to DB: ", err);
    } else {
      callback(rows.insertId);
    }
  });
};

