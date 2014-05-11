var Seq = require('sequelize');

var sequelize = new Seq('chat', 'root', '', {
  dialect: 'mysql'
});

var seqUsers = sequelize.define('seqUsers', {
  id: { type: Seq.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Seq.STRING(100) },
  roomname: { type: Seq.STRING(100) },
  text: { type: Seq.STRING(500) },
  createdat: { type: Seq.DATE, defaultValue: Seq.NOW }
}, {
  timestamps: false
});

// seqUsers.sync().success( function() {
//   var newData = seqUsers.build({
//     username: 'jack',
//     roomname: 'lobby',
//     text: 'bob was here'
//   });
//   newData.save().success(function() {
//     seqUsers.findAll( {where: { username: 'jack' } }).success(function(rows) {
//       console.log(rows);
//     });
//   });
// });

module.exports.readDatabase = function(callback) {
  seqUsers.findAll( {order: 'id DESC'} ).success(function(rows){
    callback(rows);
  });
};

module.exports.writeDatabase = test = function(message, callback) {
  console.log("Message :", message);

  seqUsers.create(message).success(function(rows){
    var id = rows["dataValues"]["id"];
    callback(id);
  });
};
