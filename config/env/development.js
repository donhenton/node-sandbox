// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	sessionSecret: 'developmentSessionSecret',
       // db: {url: 'mongodb://mongouser:mongo9000@ds029811.mongolab.com:29811/restaurants'}
         db: {url: 'mongodb://localhost/restaurant_collection'}
};