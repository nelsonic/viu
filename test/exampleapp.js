var http = require('http'),
V = require('../lib/viu');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  // console.log(request);
  response.writeHead(200, {"Content-Type": "text/html"});
  options = {"view":"no_variables"};
  options.callback = function(data){
  	response.end(data);
  }
  V(options);
});


// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");