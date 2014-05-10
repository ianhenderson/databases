var utils = require('./utils');
var sql = require('../SQL/persistent_server');

var getMessages = function(request, response) {
  // retrieve data from SQL database and assign to messages
  sql.readDatabase(function(messages) {
    utils.sendResponse(response, {results: messages});
  });
};

var postMessage = function(request, response) {
  utils.collectData(request, function(message){
    // write data to SQL database
    sql.writeDatabase(message, function(id) {
      utils.sendResponse(response, {objectId: id});
    });
  });
};

var options = function(request, response) {
  utils.sendResponse(response);
};

var actions = {
  'GET': getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

module.exports = function(request, response) {

  var action = actions[request.method];
  if( action ){
    action(request, response);
  } else {
    utils.send404(response);
  }
};
