module.exports = function (app, config) {

    var daoService = {};
    //console.log("config in dao "+config.db);
    var restaurantListIndex = {};
    var mongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Q = require('q');
    daoService.promisedConnect = function ()
    {
        var deferredDbConnection = Q.defer();
        mongoClient.connect(config.db.url, function (err, database) {
            if (err) {
                deferredDbConnection.reject(err);
                return;
            }
            deferredDbConnection.resolve(database);
        });
        return deferredDbConnection.promise;
    }


    daoService.createIdResponse = function (idValue)
    {
        var id = {};
        id["id"] = idValue;
        return id;
    };
    daoService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };
    daoService.getAllRestaurants = function ()
    {

        //    console.log(config.db.url);


        var success = function (db)
        {

            var col = db.collection('restaurants');
            var deferredResult = Q.defer();
            col.find({}).toArray(function (err, items) {
                // console.log("error " + err);
                if (err)
                {
                    deferredResult.reject(err);
                }
                else
                {
                    deferredResult.resolve(items);
                }

                db.close();
            });
            return deferredResult.promise;
        };
        return   daoService.promisedConnect().then(success, console.error);

    };

    daoService.getRestaurantById = function (id)
    {
        var success = function (db)
        {
            //  console.log("my id " + id);
            var col = db.collection('restaurants');
            var deferredResult = Q.defer();
            var objId = new ObjectID(id);
            var searchCriteria = {_id: objId};

            col.find(searchCriteria).toArray(function (err, items) {

                if (err)
                {
                    deferredResult.reject(err);
                }
                else
                {
                    deferredResult.resolve(items);
                }

                db.close();
            });
            return deferredResult.promise;
        };
        return   daoService.promisedConnect().then(success, console.error)
    };


    daoService.createRestaurant = function (newRestaurant)
    {

        var success = function (db)
        {
            //  console.log("my id " + id);
            var col = db.collection('restaurants');
            var deferredResult = Q.defer();


            col.insert(newRestaurant, function (err, result) {
                console.log(result);
                if (err)
                {
                    deferredResult.reject(err);
                }
                else
                {
                    deferredResult.resolve(result);
                }

                db.close();
            });
            return deferredResult.promise;
        };


        return   daoService.promisedConnect().then(success, console.error);
    };

    daoService.saveRestaurant = function (restaurant, id)
    {
        var success = function (db)
        {

            var col = db.collection('restaurants');
            var deferredResult = Q.defer();


            col.update({_id: new ObjectID(id)}
            , {$set: {
                    name: restaurant.name,
                    city: restaurant.city,
                    state: restaurant.state,
                    version: restaurant.version,
                    zipCode: restaurant.zipCode,
                    reviews: restaurant.reviews
                }},
            function (err, result) {
                //console.log(result);
                if (err)
                {
                    deferredResult.reject(err);
                }
                else
                {
                    deferredResult.resolve(result);
                }

                db.close();
            });
            return deferredResult.promise;
        };
        return   daoService.promisedConnect().then(success, console.error);
    };

    daoService.deleteRestaurant = function (restaurantId)
    {
        var success = function (db)
        {

            var col = db.collection('restaurants');
            var deferredResult = Q.defer();


            col.remove({_id: new ObjectID(restaurantId)},
                    function (err, result) {
                        //console.log(result);
                        if (err)
                        {
                            deferredResult.reject(err);
                        }
                        else
                        {
                            deferredResult.resolve(result);
                        }

                        db.close();
                    });
            return deferredResult.promise;
        };
        return   daoService.promisedConnect().then(success, console.error);
    };

    ////////////////reviews //////////////////////////////

    daoService.addReview = function (reviewBody, restaurantId)
    {
        var success = function (restaurantArray)
        {
            if (restaurantArray.length == 0)
            {
                console.log("in review zero '" + restaurantId + "'");
                return null;
            }
            else
            {
                var restaurant = restaurantArray[0];
                reviewBody._id = new ObjectID();
                console.log(reviewBody);
                restaurant.reviews.push(reviewBody);

                return  {"restaurant": restaurant, "reviewId": reviewBody._id};
            }
        }

        var processReview = function (restaurantWithNewReview)
        {
            if (restaurantWithNewReview == null)
            {
                return null;
            }
            else
            {
                return daoService.saveRestaurant(restaurantWithNewReview.restaurant,
                        restaurantWithNewReview.restaurant._id)
                        .then(function (res) {
                            return daoService.createIdResponse(restaurantWithNewReview.reviewId);
                        }, console.error);

            }
        }

        return daoService.getRestaurantById(restaurantId).then(success, console.error)
                .then(processReview, console.error);
    }

    app.daoService = daoService;
};