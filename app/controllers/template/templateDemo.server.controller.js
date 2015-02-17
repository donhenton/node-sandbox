// Invoke 'strict' JavaScript mode
'use strict';
// this is a demonstration that is not currently used
// Create a new 'render' controller method
 var renderHTML = function(req, res) {
	 
	
	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('templateDemo', {
		title: 'Get a job, bozo'
	});
        
 };
renderHTML(req,res);