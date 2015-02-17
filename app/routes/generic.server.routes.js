// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    
    
    //rendering functions must define these first ////////////////////////////

    var indexRender = function (req, res) {
         
        

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('index', {
            title: 'Node Demonstration App'
        });

    };
    
    var windowsRender = function(req,res)
    {
        res.render('windows', {
            title: 'Windows XP Notes'
        });
    }
    
    var newPageRender = function(req,res)
    {
        res.render('newPage', {
            title: 'New Page Notes'
        });
    }
    
    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/', indexRender);
        app.get('/windows.doc', windowsRender);
        app.get('/newPage.doc', newPageRender);
};