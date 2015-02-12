// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var embeddedJS = require('../controllers/embeddedJS.server.controller');

	// Mount the 'index' controller's 'render' method
	app.get('/embeddedJS.doc', embeddedJS.render);
};