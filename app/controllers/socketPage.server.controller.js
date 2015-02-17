// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function(req, res) {
	 
	 
	
	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('socketPage', {"title": "Web Socket Chat Demo"});
};
