// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'index' controller


    // Mount the 'index' controller's 'render' method

    var chatPageRender = function (req, res)
    {
        res.render('chatPage', {
            title: 'Chat Demo'
        });
    }
    
    
    var synchQueryRender = function (req, res)
    {
        res.render('synchQuery', {
            title: 'Synchronous Socket Query'
        });
    }

      app.get('/syncQuery.doc', synchQueryRender);
   // app.get('/chatPage.doc', chatPageRender);
   
   
};