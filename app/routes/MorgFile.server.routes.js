// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'index' controller


    // Mount the 'index' controller's 'render' method

    var morgeFilePageRender = function (req, res)
    {
        res.render('morgfile/morgfile', {
            title: 'Morge File Application'
        });
    }
    
    

      app.get('/MorgFile.doc', morgeFilePageRender);
   // app.get('/chatPage.doc', chatPageRender);
   
   
};