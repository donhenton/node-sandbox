// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object

// note development.js is no longer in the source tree to protect the innocent
// it can be reproduced from this file



module.exports = {
	sessionSecret: 'productionSessionSecret',
       // db: {url: "mongodb://mongouser:#######@ds029811.mongolab.com:29811/restaurant_collection"}
       db: {url: process.env.MONGO_URI},
       morgueDb: {url: process.env.MONGO_MORGUE_URI},
       mailPassword: process.env.MAIL_PASSWORD
};