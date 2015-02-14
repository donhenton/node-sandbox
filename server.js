// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Load the 'express' module
var express = require('./config/express');

// Create a new Express application instance
var app = express();

// Use the Express application instance to listen to the '3000' port


var portVar = 3000;
if (process.env.NODE_ENV === 'production') {
    portVar = process.env.PORT;
}  
app.listen(portVar);
// Log the server status to the console
console.log('Server running at http://localhost:' + portVar+" ("+process.env.NODE_ENV+")");

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;