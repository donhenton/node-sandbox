// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	sessionSecret: 'productionSessionSecret',
       // db: {url: "mongodb://mongouser:mongo9000@ds029811.mongolab.com:29811/restaurant_collection"}
       db: {url: process.env.MONGO_URI}
};