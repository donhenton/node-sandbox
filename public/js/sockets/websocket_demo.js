// Code goes here
angular.module('exampleApp', [])
  .controller('MainCtrl', function($scope, $q, $log, $window) {
    var websocket = new $window.WebSocket("ws://echo.websocket.org/");

    var messages = {
      requests:  [],
      unhandled: []
    };
    $scope.messages = messages;

    // Setup reactor
    var callbacks = {};
    websocket.onmessage = function(event) {
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

    var requestId = 0;
    $scope.getRequestId = function() {
      return requestId++;
    };

    $scope.request = function(data) {
      var request = {
        request_id: $scope.getRequestId(),
        data: data
      };
      var deferred = $q.defer();
      callbacks[request.request_id] = deferred;
      messages.requests.push(request);
      websocket.send(angular.toJson(request));
      return deferred.promise.then(function(response) {
        request.response = response;
        return response;
      });
    };
    
    $scope.requestData = "Echo Test";
  });
