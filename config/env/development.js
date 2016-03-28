// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	sessionSecret: 'developmentSessionSecret',
       // db: {url: 'mongodb://user:password@server/restaurant_collection'}
         db: {url: 'mongodb://localhost/restaurant_collection'},
         morgueDb: {url: 'mongodb://localhost/morguefile'}
};

 