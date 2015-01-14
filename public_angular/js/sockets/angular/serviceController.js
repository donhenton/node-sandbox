(function () {

    var serviceController = function ($scope, $log, connectorService) {


        $scope.sendMessage = function ()
        {

         
                    connectorService.performRestaurantRequest("bonzo").
                    then(function (data, status, headers, config) {
                        $scope.serverResponse = angular.toJson(data, true);
                        console.log("success " + data);
                    }).
                    catch (function (data, status, headers, config) {
                        console.log("error " + data);
                    });


        };


        $scope.serverResponse = "test get a job ";




    };


    serviceController.$inject = ['$scope', '$log', 'connectorService'];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);


}());

