// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');
var fs = require('fs');
var vm = require('vm');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Load the 'index' routing file
        var daoService = 
        require('../app/daos/restaurantdao.server.js')(config);
        
	require('../app/routes/index.server.routes.js')(app);
        require('../app/routes/otherPage.server.routes.js')(app);
        require('../app/routes/embeddedJS.server.routes.js')(app);
        require('../app/routes/restaurant.server.routes.js')(app,daoService);
        require('../app/routes/tmpl.server.routes.js')(app,fs,vm);
        
       
	// Configure static file serving
	app.use(express.static('./public'));

	// Return the Express application instance
	return app;
};