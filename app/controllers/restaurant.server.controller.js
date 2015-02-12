// Invoke 'strict' JavaScript mode
'use strict';
// not used currently
// Create a new 'render' controller method
exports.render = function(req, res) {
	 
	res.render('restaurant', {'title': 'Restaurant App'});
};
