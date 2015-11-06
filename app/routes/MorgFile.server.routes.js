// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app, morgueService) {

    // Mount the 'index' controller's 'render' method

    var morgeFilePageRender = function (req, res)
    {
        res.render('morguefile/morguefile', {
            title: 'Morgue File Application'
        });
    }
    
     var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(morgueService.createError(errorString, "ErrorClass"));
    }

    //@getData **** json service to get the folder data
    app.get('/morguefile/getData', function (req, res) {

        morgueService.getData().then(function (items)
        {
            //console.log("items zzz "+items.length);
            res.json(items[0]);
        }
        , function (err)
        {
            reportError(res, err.toString());
        });
    });

    app.put('/morguefile/saveData', function (req, res) {

        var success = function (result)
        {

            if (result.result.ok === 1)
            {

                console.log(result);
                if (result.result.n === 1)
                {
                    res.json(null);
                }



            }
            else
            {
                //console.log("in error handler "+result)
                //console.log(result);
                reportError(res, "error in success handler " + result.toString());
            }

        };

        var error = function (err) {
            reportError(res, err.toString());
        };

        morgueService.saveData(req.body).then(success, error);
    });


 
    /**
     * route for the page
     */
    app.get('/MorgFile.doc', morgeFilePageRender);
    // app.get('/chatPage.doc', chatPageRender);


};