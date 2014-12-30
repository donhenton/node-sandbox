// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var otherPage = require('../controllers/otherPage.server.controller');

	// Mount the 'index' controller's 'render' method
	app.get('/otherPage.bozo', otherPage.render);
};