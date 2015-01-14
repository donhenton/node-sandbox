(function () {
    var socketConnectorFactory = function ($log)
    {
        var websocket = null;
        var messages = {
            requests: [],
            unhandled: []
        };

        var callbacks = {};
        var requestId = 0;


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


        performRequest = function (data) {
            var request = {
                request_id: $scope.getRequestId(),
                data: data
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

    socketConnectorFactory.$inject = ['$log'];
    //socketConnectorFactory();

    angular.module('serviceApp').factory('socketConnectorFactory', socketConnectorFactory);

}());