'use  strict';

module.exports = function (config) {

    var jwtService = {};


    var mongoClient = require('mongodb').MongoClient;
    var uuid = require('node-uuid');
    var jwt = require('jsonwebtoken');
    var ObjectID = require('mongodb').ObjectID;
    var Q = require('q');
    var secret = config.jwtDb.secret;
    var COLLECTION_NAME = 'tokens';
    var log4js = require('log4js');
    var logger = log4js.getLogger('jwtdao.server.js');

//https://github.com/dwyl/learn-json-web-tokens/tree/master/example/lib
//http://www.svlada.com/jwt-token-authentication-with-spring-boot/


    function  promisedDBConnect()
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
    }
    ;



    function saveTokeInfo(info)
    {
        var success = function (db)
        {
            //  console.log("my id " + id);
            var col = db.collection(COLLECTION_NAME);
            var deferredResult = Q.defer();


            col.insert(info, function (err, result) {
                //  console.log(result);
                if (err)
                {
                    deferredResult.reject(err);
                } else
                {
                    deferredResult.resolve(result);
                }

                db.close();
            });
            return deferredResult.promise;
        };


        return    promisedDBConnect().then(success, console.error);
    }

    function getTokenById(guidId)
    {
        var success = function (db)
        {
            //  console.log("my id " + id);
            var col = db.collection(COLLECTION_NAME);
            var deferredResult = Q.defer();

            var searchCriteria = {auth: guidId};

            col.find(searchCriteria).toArray(function (err, items) {

                if (err)
                {
                    deferredResult.reject(err);
                } else
                {
                    deferredResult.resolve(items);
                }

                db.close();
            });
            return deferredResult.promise;
        };
        return    promisedDBConnect().then(success, console.error)
    }
    ;


    function generateUUID()
    {
        return uuid();
    }




     function createError(message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };



    jwtService.generateToken = function (req, opts) {
        opts = opts || {};

        // By default, expire the token after 1 days.
        // NOTE: the value for 'exp' needs to be in seconds since
        // the epoch as per the spec!
        var GUID = generateUUID();
        var expiresDefault = Math.floor(new Date().getTime() / 1000) + 1 * 24 * 60 * 60;
        var dataObj = {
            auth: GUID,
            agent: req.headers['user-agent'],
            exp: opts.expires || expiresDefault
        }


        return saveTokeInfo(dataObj).then(function(){
            var token = jwt.sign(dataObj, secret);
            return token;
        },
        function(err)
        {
            console.log("generateToken "+JSON.stringify(err))
        });

 
    }

    jwtService.verifyToken = function (token) {
        var decoded = false;
       // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiOTBhYzA1ODEtYTRhNy00YTEzLWEyYzktNDZkZjQwNDIyNWExIiwiYWdlbnQiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xMV82KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTkuMC4zMDcxLjExNSBTYWZhcmkvNTM3LjM2IiwiZXhwIjoxNDk5ODkxMzM1LCJfaWQiOiI1OTY1MzUwNzQyYWQ1ZTY5NWIwZjgxNzYiLCJpYXQiOjE0OTk4MDQ5MzV9.2ve3j-z1K9G6kyp5dmk9XaVHbaxxIdBF68-rukFF2TY"
        try {
            decoded = jwt.verify(token, secret);
            logger.debug("in verify "+JSON.stringify(decoded))
        } catch (e) {
            decoded = false; // still false
            logger.error("verify issue "+JSON.stringify(e))
        }
        return decoded;
    }

    jwtService.validateWebRequest = function (token, callback)
    {
        //token will be in req.header.authorization
        var decoded = this.verifyToken(token);
        var callBackMessage = {error: null, message: null, success: false}
        if (!decoded || (decoded && !decoded.auth))
        {
            callBackMessage.error = "Authorization failed";
            callBackMessage.message = JSON.stringify(decoded);
            callback(callBackMessage);
            return;
        }
        if (decoded && decoded.auth)
        {
            callBackMessage.success = true;
            callBackMessage.message = JSON.stringify(decoded);
            callback(callBackMessage);
            
        }
    }




    return jwtService;

};