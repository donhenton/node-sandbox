/**
 * This service owns the socket io web socket. It will use a promise
 * to reconcile the request/response and is patterned after 'reply-to'
 * in JMS
 * see http://clintberry.com/2013/angular-js-websocket-service/
 * @returns {undefined}
 * 
 * TODO 
 * 
 * requestType: restaurantQuery, insertRestaurant ......
 * correleationId: used to match request, response
 * payload:
 * 
 * 
 */



(function () {
    var connectorService = function ($log)
    {
        var websocket = null;
        var messages = {
            requests: [],
            unhandled: []
        };

        var callbacks = {};
        var correleationId = 0;


        websocket = io.connect(g_socketBase);
        console.log("did the init")

        websocket.onmessage = function (event) {
            var data = angular.fromJson(event.data);
            if (angular.isDefined(callbacks[data.request_id])) {
                var callback = callbacks[data.request_id];
                delete callbacks[data.request_id];
                callback.resolve(data);
            } else {
                $log.error("Unhandled message: %o", data);
                messages.unhandled.push(data);
            }
        };


        performRequest = function (requestType,payload) {
            correleationId ++;
            var request = {
                requestType: requestType,
                correlationId: correleationId,
                payload: payload
            };
            var deferred = $q.defer();
            callbacks[request.request_id] = deferred;
            messages.requests.push(request);
            websocket.send(angular.toJson(request));
            return deferred.promise.then(function (response) {
                request.response = response;
                return response;
            });
        };



    };

    connectorService.$inject = ['$log'];

    angular.module('serviceApp').factory('connectorService', connectorService);

}());