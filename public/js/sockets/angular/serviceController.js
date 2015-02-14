(function () {

    var serviceController = function ($scope, $log, restaurantQueryService) {


        $scope.sendMessage = function ()
        {

            console.log("searching for '%s'", $scope.searchString);
            restaurantQueryService.performRestaurantRequest($scope.searchString).
                    then(function (data, status, headers, config) {
                        $scope.restaurantList = data.payload;
                        //console.log("success " + angular.toJson($scope.restaurantList, true));
                        
                    }).
                    catch (function (data, status, headers, config) {
                        console.log("error " + data);
                    });


        };


        $scope.restaurantList = [];
        $scope.searchString = 'restaurant';



    };


    serviceController.$inject = ['$scope', '$log', 'restaurantQueryService'];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);


}());

