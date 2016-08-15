// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function (req, res) {


    
    //console.log("permissions: "+req.query.permissions);
    var permissions = 'yes';
    if (typeof req.query.permissions == 'undefined')
    {
        permissions = 'no';
    }

    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('embeddedJS',
            {
                'permissions': permissions,
                'title': 'Templating Demo',
                "supplies": ['manny', 'moe', 'jack']
            });
};
