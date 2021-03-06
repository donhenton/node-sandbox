module.exports = function (app) {

    var path = require('path');
    //rendering functions must define these first ////////////////////////////

    var promisesDemoRender = function (req, res) {

        res.render('errorhandling/promisesDemo', {
            title: 'Promise Demonstation'
        });

    };

    var errorInRouteRender = function (req, res, next) {

        //pass in the next variable and forward the error
        //it will be picked up by the error handler defined
        //in express.js
        //try catch can be used to guard entire block of code

        try {
            var err = Error("errorInRoute threw an error");
            throw err
        } catch (e)
        {
            next(err);
        }

    };

    var errorHandlerMainRender = function (req, res) {

        res.render('errorhandling/main', {
            title: 'Error Handling Demonstation'
        });

    };

    var chainedRequestMainRender = function (req, res) {

        res.render('errorhandling/chainedRequestMain', {
            title: 'Chained Handlers'
        });

    };


///////// chained handlers ///////////////////////////////////////////////////
    var chainedResponseRender = function (req, res) {

        res.render('errorhandling/chainedResponse', {
            title: 'Chained Response',
            message: req.body.bozoData.message,
            inputString: req.body.inputString,
            bozoScore: req.bozoScore
        });

    };

    app.post('/chainedResponse.doc',
            //chained handler 1
                    function (req, res, next)
                    {
                        var testString = req.body.inputString.toUpperCase().trim();
                        req.body.testString = testString;
                        //console.log("in error routine of route");
                        if (req.body.testString.indexOf("ERROR") > -1)
                        {
                            //console.log("throw error in route")
                            next({error: "got '" + testString + "' in route", fromErrorClient: true});
                            //this error message will be handled by the error handling
                            //middleware
                        } else
                        {
                            next();
                        }

                    },
                    //chained handler 2
                            function (req, res, next) {
                                var testString = req.body.testString;
                                // req.body.testString =  testString ;
                                var bozoScore = 0;
                                req.body.bozoData = {};
                                if (testString.indexOf("BOZO") > -1)
                                {
                                    bozoScore++;
                                }
                                if (testString.indexOf("BIG") > -1)
                                {
                                    bozoScore++;
                                }
                                req.bozoScore = bozoScore;
                                if (bozoScore === 1)
                                {
                                    req.body.bozoData.message = "(processed by route 1)";

                                    chainedResponseRender(req, res);
                                    //next('route');//break out at this point

                                } else
                                {
                                    next(); //go to the next processor
                                }

                            },
                            //chainded handler 3
                                    function (req, res, next) {
                                        // handle bozo score of 2
                                        req.body.bozoData.message = "(processed by route 2)";
                                        return next();
                                    },
                                    //final handler
                                    chainedResponseRender);

///////////////////////////////////////////////////////////////////////
                            // routes
                            ///////////////////////////////////////////////////////////////////////
                            app.get('/errorHandling.doc', errorHandlerMainRender);
                            app.get('/chainedRequestMain.doc', chainedRequestMainRender);
                            app.get('/promisesDemo.doc', promisesDemoRender);
                            app.get('/errorInRoute.doc', errorInRouteRender);
                        }