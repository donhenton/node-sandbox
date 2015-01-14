(function () {

    var serviceController = function ($scope, $log, connectorService) {


        $scope.sendMessage = function ()
        {

            console.log("searching for '%s'", $scope.searchString);
            connectorService.performRestaurantRequest($scope.searchString).
                    then(function (data, status, headers, config) {
                        $scope.restaurantList = data.payload;
                        console.log("success " + angular.toJson($scope.restaurantList, true));
                        
                    }).
                    catch (function (data, status, headers, config) {
                        console.log("error " + data);
                    });


        };


        $scope.restaurantList = [];
        $scope.searchString = 'restaurant';



    };


    serviceController.$inject = ['$scope', '$log', 'connectorService'];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);


}());

