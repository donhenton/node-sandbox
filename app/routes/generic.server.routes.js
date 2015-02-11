// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'index' controller
   // var index = require('../controllers/index.server.controller');

    // Mount the 'index' controller's 'render' method
    
    //rendering functions must define these first ////////////////////////////

    var indexRender = function (req, res) {
        // If the session's 'lastVisit' property is set, print it out in the console 
        if (req.session.lastVisit) {
            console.log(req.session.lastVisit);
        }

        // Set the session's 'lastVisit' property
        req.session.lastVisit = new Date();

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'Node Demonstration App'
        });

    };
    
    var windowsRender = function(req,res)
    {
        res.render('windows', {});
    }
    
    
    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/', indexRender);
        app.get('/windows.doc', windowsRender);
};