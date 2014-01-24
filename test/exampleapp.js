var V = require('../lib/viu'),
port = 8000; 

var server = require('http').createServer(function (request, response) {
  console.log(request.url);
  response.writeHead(200, {"Content-Type": "text/html"});
  options = {
  		"view"  :"basic_variables", 
  		"title" : "My First Parsed Page!",
  		"name"  : "Your Name Here"
  }
  V(options, function(err, data){
  	response.end(data);
  });
}).listen(port); // Listen on port 8000

console.log("Server running @ http://127.0.0.1:"+port);