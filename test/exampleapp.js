var http = require('http'),
V = require('../lib/viu');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  console.log(request.url);
  response.writeHead(200, {"Content-Type": "text/html"});
  options = {"view":"basic_variables"};
  options.title = "My First Parsed Page!"
  options.name = "Tigeroony";

  V(options, function(err, data){
  	response.end(data);
  });
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");