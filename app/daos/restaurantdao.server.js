module.exports = function (app, config) {

    var daoService = {};
    //console.log("config in dao "+config.db);
    var restaurantListIndex = {};


    var mongoClient = require('mongodb').MongoClient;


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
        console.log("get all on server "+config.db.url);
        mongoClient.connect(config.db.url, function (err, db) {
             console.log("error "+err);
            //console.log("Connected correctly to server "+config.db.url);

           // db.close();
        });


        return [];
    };

    var setUpRestaurantList = function ()

    {
        console.log("setting list");
        app.daoService = daoService;
        restaurantListIndex = {};


    };
    setUpRestaurantList();

};