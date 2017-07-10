
// REQUIRING MODULES
// ==================================================

var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var router = require("./router");



// BASIC CONFIG
// ==================================================

// This variable will allow us to access all the good things express has to offer and create an instance of express.
var app = express();

// BodyParser is used for parsing incoming JSON requests. Remember that JSON comes in as one humongous string. 
// BodyParser helps take it out of that stringified format and puts it into parsed code.
app.use(bodyParser.json({type: '*/*'})); 

// Calls the router.js file, passing the instance of express to it
// This is where we handle all the routing
router(app)

// If there's an environment variable defined, use it. If not, use 3000.
var port = process.env.port || 3000;





















// SERVER STARTUP
// ==================================================

// The http library is a native node library and is used for low level http requests. This line creates a node server.
// We can pass in our express app into the createServer function express application by passing in the app variable from above.
var server = http.createServer(app);

// Get our server to listen to any requests from the outside world. 
// We’ll add the console message to say that the server is up and running.
server.listen(port, function() {
	console.log("Server listening on port " + port);
});