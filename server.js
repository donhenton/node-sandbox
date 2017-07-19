// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the 'express' module
var express = require('./config/express');
var config = require('./config/config');
// Create a new Express application instance
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var daoService = 
  require('./app/daos/restaurantdao.server.js')(config);
var json3 = require('json3');
var log4js = require('log4js');
var logger = log4js.getLogger('server.js');
var $depth = 10;
log4js.configure({
    appenders: [
        {type: 'console',
            "layout": {
                "type": "pattern",
                //"pattern": "%d %[%p%] %[%c%] - %m%n"

                pattern: "%d %c %[%p {%x{ln}} -%]\t%m%n",
                tokens: {
                    ln: function () {
                        // The caller:
                        return (new Error).stack.split("\n")[$depth]
                                // Just the namespace, filename, line:
                                .replace(/^\s+at\s+(\S+)\s\((.+?)([^\/]+):(\d+):\d+\)$/, function () {
                                    // return arguments[1] +' '+ arguments[3] +' line '+ arguments[4];
                                    //   return arguments[0] +' '+ arguments[2] +' line '+arguments[3]
                                    return arguments[3] + ':' + arguments[4];
                                });
                    }
                }



            }
        } 
    ],
    "levels": {
        "[all]": "DEBUG" 
    }

});

// Use the Express application instance to listen to the '3000' port

require("./app/websockets/socketServer.js")(io,daoService,json3);

var portVar = 3000;
if (process.env.NODE_ENV === 'production') {
    portVar = process.env.PORT;
}  
var listener = server.listen(portVar,function(){
    config.running_port = listener.address().port;
     
  // logger.info("start listening " +config.running_port )
});
// Log the server status to the console
console.log('Server running at http://localhost:' + portVar+" ("+process.env.NODE_ENV+")");

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;