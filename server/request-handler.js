/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */

  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var idCounter = 1;

var allOurBase = [
  { username: "Toaplan",
  text: "All your base are belong to us!",
  roomname: "Zero Wing",
  id: idCounter
  }
];

exports.handler = function(request, response) {

  /*
    handle 3 types of request: POST, GET, OPTIONS
    for OPTIONS:
      send back the server header
    for POST:
      Get data client sent
      assign id to that data instance
      save that data in a location on the server
      send back the assigned id
    for GET:
      send response back to client with data stored on server
   */
  var requestType = request.method;
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  switch( requestType ) {
    case "OPTIONS":
      response.writeHead(statusCode, headers);
      response.end("Here's your options, chump!");
      break;
    case "GET":
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify( { results: allOurBase } ) );
      break;
    case "POST":
      var data = "";
      request.on( "data", function( partialData ) {
        data += partialData;
      } );
      request.on( "end", function() {
        var base = JSON.parse( data );
        base["id"] = ++idCounter;
        allOurBase.unshift( base );
        response.writeHead(201, headers);
        response.end( JSON.stringify( { id: base["id"] } ) );
      } );
      break;
    default:
      console.log("d'oh!");
  }
};

exports.send404 = function( response ) {
  response.writeHead( 404, headers );
  response.end( "No base for you!" );
};
























