module.exports = function (app, config) {

    var daoService = {};
    //console.log("config in dao "+config.db);
    var restaurantListIndex = {};


    var mongoClient = require('mongodb').MongoClient;
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
        }
        return   daoService.promisedConnect().then(success, console.error)

    }


    var setUpRestaurantList = function ()

    {
        console.log("setting list");
        app.daoService = daoService;
        restaurantListIndex = {};


    };
    setUpRestaurantList();

};