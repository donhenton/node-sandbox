/**
 * This service allows for queries to the restaurant db via websockets.
 *  It will use a promise to reconcile the request/response and 
 *  is patterned after 'reply-to' in JMS
 *  The websocket is injected via the socketFactory code
 *  
 * see http://clintberry.com/2013/angular-js-websocket-service/ for the call
 * back pattern
 * 
 * @returns {undefined}
 * 
 * 
 * 
 */



(function () {
    var restaurantQueryService = function ($log, $q,socketFactory)
    {
         
        var messages = {
            requests: [],
            unhandled: []
        };

        var callbacks = {};
        var correlationId = 0;

        var websocket = socketFactory.get();
        console.log("did the init")

        websocket.on('restaurantResponse', function (dataIn) {
          //  console.log("in restaurantResponse "+  angular.toJson(dataIn));
            
            var data = angular.fromJson(dataIn);
            if (angular.isDefined(callbacks[data.correlationId])) {
                var callback = callbacks[data.correlationId];
                delete callbacks[data.correlationId];
                callback.resolve(data);
            } else {
                $log.error("Unhandled message: %o", data);
                messages.unhandled.push(data);
            }
        });

        var serviceFunctions = {};

        /**
         * this will search for restaurants which have the string
         * in their name
         * 
         * @param {type} stringToSearchFor
         * @returns 
         * correlationId:
         * payload is an array of String names, 0...n
         */
        serviceFunctions.performRestaurantRequest = function (stringToSearchFor) {
            correlationId++;
        var request = {
                correlationId: correlationId,
                payload: stringToSearchFor
            };
            var deferred = $q.defer();
            callbacks[request.correlationId] = deferred;
            messages.requests.push(request);
            websocket.emit('restaurantRequest', angular.toJson(request));
            return deferred.promise.then(function (response) {
                request.response = response;
                return response;
            });
        };

        return serviceFunctions;

    };

    restaurantQueryService.$inject = ['$log', '$q','socketFactory'];

    angular.module('serviceApp').factory('restaurantQueryService', restaurantQueryService);

}());