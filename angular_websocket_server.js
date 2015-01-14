// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the 'express' module
var express = require('./config/angular_websocket_server_config');
var config = require('./config/config');
// Create a new Express application instance
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var daoService = 
  require('./app/daos/restaurantdao.server.js')(config);

require("./app/angular_websocket_server/angular.server.js")(io,daoService);

// Use the Express application instance to listen to the '4000' port
//app.listen(4000);
server.listen(4000);

// Log the server status to the console
console.log('Server running at http://localhost:4000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;