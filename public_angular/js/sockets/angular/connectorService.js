/**
 * This service owns the socket io web socket. It will use a promise
 * to reconcile the request/response and is patterned after 'reply-to'
 * in JMS
 * see http://clintberry.com/2013/angular-js-websocket-service/
 * @returns {undefined}
 * 
 * TODO 
 * 
 *  
 * correleationId: used to match request, response
 * payload:
 * 
 * 
 */



(function () {
    var connectorService = function ($log, $q)
    {
        var websocket = null;
        var messages = {
            requests: [],
            unhandled: []
        };

        var callbacks = {};
        var correlationId = 0;


        websocket = io.connect(g_socketBase);
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
         * this will search for a restaurant which have the string
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

    connectorService.$inject = ['$log', '$q'];

    angular.module('serviceApp').factory('connectorService', connectorService);

}());