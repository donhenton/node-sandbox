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
        id["_id"] = idValue;
        // console.log(id);
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
                    var t = items
                            .sort(
                            
                            function(a,b){ 
                                var y = a.name.toString() ;
                                var z = b.name.toString() ;
                                return 1*
                                y.localeCompare(z,'en', {'sensitivity': 'base'})}
                            
                            );
                    deferredResult.resolve(t);
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
         if (newRestaurant.reviews == null || 
                        (typeof newRestaurant.reviews) == 'undefined')
                {
                    newRestaurant.reviews = [];
                }
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

        var error = function (err) {

            throw new Error(err);
        };
        var foundTheReview = function (restaurantArray)
        {
            if (restaurantArray.length == 0)
            {
                return null;
                //throw new Error("cannot find restaurant " + restaurantId);
            }
            else
            {
                var restaurant = restaurantArray[0];
                reviewBody._id = new ObjectID();
                // console.log(reviewBody._id +" "+restaurant._id);
                if (restaurant.reviews == null || 
                        (typeof restaurant.reviews) == 'undefined')
                {
                    restaurant.reviews = [];
                }
                restaurant.reviews.push(reviewBody);

                return daoService.saveRestaurant(restaurant,
                        restaurant._id)
                        .then(function (res) {

                            return daoService.createIdResponse(reviewBody._id);
                        }, error);
            }
        }



        return daoService.getRestaurantById(restaurantId)
                .then(foundTheReview, error);
    }


    daoService.deleteReview = function (restaurantId, reviewId)
    {
        var reviewIdObj = new ObjectID(reviewId);
        var error = function (err) {

            throw new Error(err);
        };
        var foundTheReview = function (restaurantArray)
        {
            console.log("in found review delete");
            if (restaurantArray.length == 0)
            {
                console.log("in review zero '" + restaurantId + "'");
                throw new Error("cannot find restaurant " + restaurantId);
            }
            else
            {
                // console.log("shifting through reviews ")
                var foundIt = false;
                var reviews = restaurantArray[0].reviews;
                for (var i = 0; i < reviews.length; i++)
                {
                    //console.log(reviews[i]._id,reviewIdObj)
                    if (reviews[i]._id.equals(reviewIdObj))
                    {
                        reviews.splice(i, 1);
                        foundIt = true;
                    }
                }

                if (foundIt == false)
                {
                    throw new Error("cannot find review " + reviewId);
                }


            }
            var restaurantWithNewReview = restaurantArray[0];
            return daoService.saveRestaurant(restaurantWithNewReview,
                    restaurantWithNewReview._id)
                    .then(function (res) {
                        return {ok: 1};
                    }, error);

        }// found the review

        return daoService.getRestaurantById(restaurantId).then(foundTheReview, error);




    }//end deleteReview

    daoService.saveReview = function (restaurantId, reviewId,newReviewBody)
    {
        var reviewIdObj = new ObjectID(reviewId);
        var error = function (err) {

            throw new Error(err);
        };
        var foundTheReview = function (restaurantArray)
        {
            console.log("in found review for save");
            if (restaurantArray.length == 0)
            {
               // console.log("in review zero '" + restaurantId + "'");
                throw new Error("cannot find restaurant " + restaurantId);
            }
            else
            {
                // console.log("shifting through reviews ")
                var foundIt = false;
                var reviews = restaurantArray[0].reviews;
                for (var i = 0; i < reviews.length; i++)
                {
                    //console.log(reviews[i]._id,reviewIdObj)
                    if (reviews[i]._id.equals(reviewIdObj))
                    {
                        //reviews.splice(i, 1);
                        reviews[i].starRating = newReviewBody.starRating;
                        reviews[i].reviewListing = newReviewBody.reviewListing;
                        foundIt = true;
                    }
                }

                if (foundIt == false)
                {
                    throw new Error("cannot find review " + reviewId);
                }


            }
            var restaurantWithNewReview = restaurantArray[0];
            return daoService.saveRestaurant(restaurantWithNewReview,
                    restaurantWithNewReview._id)
                    .then(function (res) {
                        return {ok: 1};
                    }, error);

        }// found the review

        return daoService.getRestaurantById(restaurantId).then(foundTheReview, error);




    }//end saveReview





    app.daoService = daoService;
};