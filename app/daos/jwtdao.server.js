'use  strict';

module.exports = function (config) {

    var jwtService = {};


    var mongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Q = require('q');
    jwtService.promisedConnect = function ()
    {
        var deferredDbConnection = Q.defer();
        mongoClient.connect(config.jwtDb.url, function (err, database) {
            if (err) {
                deferredDbConnection.reject(err);
                return;
            }
            deferredDbConnection.resolve(database);
        });
        return deferredDbConnection.promise;
    };


/*
    jwtService.saveData = function (userData)
    {



        var success = function (db)
        {

            var col = db.collection('users');
            var deferredResult = Q.defer();
            var id = userData._id;


            col.update({_id: new ObjectID(id)}
            , {$set: {
                    folderData: userData.folderData
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
        return   jwtService.promisedConnect().then(success, console.error);


    };
*/
 
    jwtService.createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };

    return jwtService;

};