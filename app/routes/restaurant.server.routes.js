// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    var daoService = app.daoService;


    //@getRestaurant(id)
    app.get('/restaurant/:id', function (req, res) {

        var restaurantId = parseInt(req.params.id);
        console.log("restaurant id " + restaurantId);
        var restaurantFound = daoService.getRestaurantById(restaurantId);
        console.log("found " + restaurantFound);

        var resVar = {};
        resVar.biteMe = "get a job";


        if (restaurantFound == null)
        {
            resVar = daoService.createError('Not Found', "NotFoundClass");
            res.status(404);
            res.json(resVar);
        }
        else
        {
            resVar = restaurantFound;
            res.json(resVar);
        }


    });

    //@getAllRestaurants
    app.get('/restaurant', function (req, res) {
        res.json(daoService.getAllRestaurants());

    });


    //@create restaurant
    app.post('/restaurant', function (req, res) {
        // console.log(req.body);
        daoService.createRestaurant(req.body);
        var resVar = daoService.createIdResponse(req.body.id);
        res.json(resVar);
    });


//@update restaurant
    app.put('/restaurant/:id', function (req, res) {
        // console.log(req.body);
        var restaurantId = parseInt(req.params.id);
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



 