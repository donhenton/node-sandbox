(function () {

    var serviceController = function ($scope, $log, connectorService) {


        $scope.sendMessage = function ()
        {
            
            var thing =
            connectorService.performRestaurantRequest("bonzo");
            console.log("sending request "+thing);
            
            
            
           /* 
            .
                    success(function (data, status, headers, config) {
                        $scope.serverResponse = angular.toJson(request, true);

                    }).
                    error(function (data, status, headers, config) {

                    });
            */
            
        };


        $scope.serverResponse = "test get a job ";




    };


    serviceController.$inject = ['$scope', '$log', 'connectorService'];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);


}());

