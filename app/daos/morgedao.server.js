module.exports = function (config) {

    var mongoService = {};
   
   
    var mongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Q = require('q');
    mongoService.promisedConnect = function ()
    {
        var deferredDbConnection = Q.defer();
        mongoClient.connect(config.morgueDb.url, function (err, database) {
            if (err) {
                deferredDbConnection.reject(err);
                return;
            }
            deferredDbConnection.resolve(database);
        });
        return deferredDbConnection.promise;
    }
    
    mongoService.getData = function()
    {
        return mongoService.getUserData('1') ;
    }
    
    
    mongoService.getUserData = function (userId)
    {
        var success = function (db)
        {
            //  console.log("my id " + id);
            var col = db.collection('users');
            var deferredResult = Q.defer();
            //var objId = new ObjectID(userId);
            //var searchCriteria = {_id: objId};
            var searchCriteria = {"userId": userId};

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
         
          
   
        return   mongoService.promisedConnect().then(success, console.error);
    };
    
    
    
    return mongoService;
    
};