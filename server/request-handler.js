var utils = require('./utils');

var idCounter = 1;
var messages = [
  {
    username: 'fred',
    text: 'hello world',
    roomName: 'lobby',
    objectId: idCounter
  }
];

var getMessages = function(request, response) {
  utils.sendResponse(response, {results: messages});
};

var postMessage = function(request, response) {
  utils.collectData(request, function(message){
    idCounter++;
    message.objectId = idCounter;
    messages.unshift(message);
    utils.sendResponse(response, {objectId: message.objectId});
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
