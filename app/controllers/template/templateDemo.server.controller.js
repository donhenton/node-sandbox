// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
 var renderHTML = function(req, res) {
	// If the session's 'lastVisit' property is set, print it out in the console 
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	// Set the session's 'lastVisit' property
	req.session.lastVisit = new Date();
	
	// Use the 'response' object to render the 'index' view with a 'title' property
	res.render('templateDemo', {
		title: 'Get a job, bozo'
	});
        
 };
renderHTML(req,res);