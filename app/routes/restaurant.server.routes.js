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
        var success = function(result)
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
        var error = function(err){reportError(res, err.toString());};
        
        daoService.createRestaurant(req.body).then(success,error);
        
    });
//@update restaurant
    app.put('/restaurant/:id', function (req, res) {
        // console.log(req.body);
        var restaurantId =  req.params.id ;
        req.body.id = restaurantId;
        var errorMessage = daoService.saveRestaurant(req.body);
        var resVar = null;
        if (errorMessage == null)
        {
            resVar = daoService.createIdResponse(req.body.id);
        }
        else
        {
            resVar = daoService.createError('Not Found', "NotFoundClass");
            res.status(404);
        }
        res.json(resVar);
    });
//@remove restaurant
    app.delete('/restaurant/:id', function (req, res) {
        // console.log(req.body);
        var restaurantId = parseInt(req.params.id);
        req.body.id = restaurantId;
        var errorMessage = daoService.deleteRestaurant(req.body);
        var resVar = null;
        if (errorMessage != null)
        {
            resVar = daoService.createError('Not Found', "NotFoundClass");
            res.status(404);
        }
        res.json(resVar);
    });
//@create review
    app.post('/restaurant/review/:restaurantId', function (req, res) {
        var restaurantId = parseInt(req.params.restaurantId);
        var reviewBody = req.body;
        var message = daoService.addReview(restaurantId, reviewBody);
        if (message == null)
            res.json(daoService.createIdResponse(reviewBody.id));
        else
        {
            var resVar = daoService.createError(message, "NotFoundClass");
            res.status(404);
            res.json(resVar);
        }
    });
//@save review
    app.put('/restaurant/review/:restaurantId/:reviewId', function (req, res) {
        var restaurantId = parseInt(req.params.restaurantId);
        var reviewId = parseInt(req.params.reviewId);
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
        var restaurantId = parseInt(req.params.restaurantId);
        var reviewId = parseInt(req.params.reviewId);
        var message = daoService.deleteReview(restaurantId, reviewId);
        if (message == null)
            return res.json(null);
        else
        {
            var resVar = daoService.createError(message, "NotFoundClass");
            res.status(404);
            res.json(resVar);
        }
    });
};



 