// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    var daoService = app.daoService;

    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(daoService.createError(errorString, "ErrorClass"));
    }
    //@getRestaurant(id) ****
    app.get('/restaurant/:id', function (req, res) {

        var restaurantId = req.params.id;
        // console.log("zzzrestaurant id " + restaurantId);

        daoService.getRestaurantById(restaurantId).then(
                function (restaurantFoundArray)
                {


                    var resVar = {};
                    resVar.biteMe = "get a job";
                    if (restaurantFoundArray.length == 0)
                    {
                        resVar = daoService.createError('Not Found',
                                "NotFoundClass");
                        res.status(404);
                        res.json(resVar);
                    }
                    else
                    {
                        resVar = restaurantFoundArray[0];
                        res.json(resVar);

                    }
                },
                function (err)
                {
                    reportError(res, err.toString());
                }
        );
    });
    //@getAllRestaurants ****
    app.get('/restaurant', function (req, res) {

        daoService.getAllRestaurants().then(function (items)
        {
            //console.log("items zzz "+items.length);
            res.json(items);
        }
        , function (err)
        {
            reportError(res, err.toString());
        });
    });
    //@create restaurant ****
    app.post('/restaurant', function (req, res) {
        // console.log(req.body);
        var success = function (result)
        {
            // console.log("ok "+result.result.ok);
            // console.log("id "+result.ops[0]._id);
            if (result.result.ok == 1)
            {
                var resVar = daoService.createIdResponse(result.ops[0]._id);
                res.json(resVar);
            }
            else
            {
                reportError(res, result.writeError.errmsg);
            }

        };
        var error = function (err) {
            reportError(res, err.toString());
        };

        daoService.createRestaurant(req.body).then(success, error);

    });
//@update restaurant ****
    app.put('/restaurant/:id', function (req, res) {
        // console.log(req.body);
        var restaurantId = req.params.id;
        var error = function (err) {
            reportError(res, err.toString());
        };

        var success = function (result)
        {

            if (result.result.ok == 1)
            {
                 
                console.log(result);
                if (result.result.n == 1)
                {
                    res.json(null);
                }
                else
                {
                    var resVar = daoService.createError('Not Found',
                            "NotFoundClass");

                    res.status(404);
                    res.json(resVar);
                }
                
                
            }
            else
            {
                //console.log("in error handler "+result)
                //console.log(result);
                reportError(res, "error in success handler " + result.toString());
            }

        };



        daoService.saveRestaurant(req.body, restaurantId).then(success, error);

    });
//@remove restaurant ****
    app.delete('/restaurant/:id', function (req, res) {
        // console.log(req.body);
        var restaurantId = req.params.id;
        var error = function (err) {
            reportError(res, err.toString());
        };

        var success = function (result)
        {
            if (result.result.ok == 1)
            {
                if (result.result.n == 1)
                {
                    res.json(null);
                }
                else
                {
                    var resVar = daoService.createError('Not Found',
                            "NotFoundClass");

                    res.status(404);
                    res.json(resVar);
                }

            }
            else
            {
                //console.log("in error handler "+result)
                //console.log(result);
                reportError(res, "error in success handler " + result.toString());
            }
        }
        daoService.deleteRestaurant(restaurantId).then(success, error);
    });
//@create review *****
    app.post('/restaurant/review/:restaurantId', function (req, res) {
        var restaurantId = req.params.restaurantId;
        //no _id will be present
        var reviewBody = req.body;


        var error = function (err) {
            reportError(res, err.toString());
        };

        var success = function (result)
        {
            if (result == null)
            {
                var resVar = daoService.createError('Not Found', "NotFoundClass");
                res.status(404);
                res.json(resVar);
            }
            else
            {
                res.json(result);
                res.status(200);

                //return the id of the new review
            }



        };



        daoService.addReview(reviewBody, restaurantId).then(success, error);
    });
//@save review
    app.put('/restaurant/review/:restaurantId/:reviewId', function (req, res) {
        var restaurantId = req.params.restaurantId ;
        var reviewId =  req.params.reviewId ;
        var reviewBody = req.body;
        var message = daoService.saveReview(restaurantId, reviewId, reviewBody);
        if (message == null)
            return res.json(null);
        else
        {
            var resVar = daoService.createError(message, "NotFoundClass");
            res.status(404);
            res.json(resVar);
        }
    });
//@delete review

    app.delete('/restaurant/review/:restaurantId/:reviewId', function (req, res) {
        var restaurantId = req.params.restaurantId;
        var reviewId = req.params.reviewId;
        var error = function (err) {
             
            reportError(res, err.toString());
        };

        var success = function (result)
        {
            if (result == null)
            {
                //couldn't find restaurant or review
                var resVar = daoService.createError('Not Found', "NotFoundClass");
                res.status(404);
                res.json(resVar);
            }
            else
            {
                //success path
                res.json(result);
                res.status(200);


            }



        };

        daoService.deleteReview(restaurantId, reviewId).then(success, error);

    });
};



 