// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function (req, res) {
    // If the session's 'lastVisit' property is set, print it out in the console 
//	if (req.session.lastVisit) {
//		console.log(req.session.lastVisit);
//	}

    // Set the session's 'lastVisit' property
    //req.session.lastVisit = new Date();
    console.log("permissions: "+req.query.permissions);
    var permissions = 'yes';
    if (typeof req.query.permissions == 'undefined')
    {
        permissions = 'no';
    }

    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('embeddedJS',
            {
                'permissions': permissions,
                "supplies": ['manny', 'moe', 'jack']
            });
};
