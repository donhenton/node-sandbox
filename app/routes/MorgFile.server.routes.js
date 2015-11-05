// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app,morgeService) {
    // Load the 'index' controller


    // Mount the 'index' controller's 'render' method

    var morgeFilePageRender = function (req, res)
    {
        res.render('morgfile/morgfile', {
            title: 'Morge File Application'
        });
    }
    
        //@getAllRestaurants ****
    app.get('/morgefile/data', function (req, res) {

        morgeService.getData().then(function (items)
        {
            //console.log("items zzz "+items.length);
            res.json(items[0]);
        }
        , function (err)
        {
            reportError(res, err.toString());
        });
    });

      app.get('/MorgFile.doc', morgeFilePageRender);
   // app.get('/chatPage.doc', chatPageRender);
   
   
};