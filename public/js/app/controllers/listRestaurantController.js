(function () {

    var listRestaurantController = function ($scope, $log, restaurantFactory, messageFactory) {

        $scope.restaurantList = null;
        $scope.errorMessage = "";

        var init = function()
        {
            console.log("init--listRestaurantController")
            restaurantFactory.init().
                    success(function (data, status, headers, config) {
                         console.log("controller init")
                         $scope.restaurantList =    data;
                      
                    }).
                    error(function (data, status, headers, config) {
                        messageFactory.raiseEvent("Initiation error")
                    });
        }
        init();

        $scope.changeRestaurant = function (event, restaurant)
        {

            restaurantFactory.changeRestaurant(restaurant);
            onError("");

        };

        var onError = function (message)
        {

            $scope.errorMessage = message;

        };

        $scope.deleteRestaurant = function (restaurant)
        {
            //confirm dialog
            //$log.log("delete restaurant")
            restaurantFactory.changeRestaurant(restaurant);
            var r = window.confirm("Do you wish to delete '"
                    + restaurant.name + "'?")
            if (r == true) {
                //$log.log("peform delete " + restaurant.name);
                restaurantFactory.deleteRestaurant(restaurant).
                    success(function (data, status, headers, config) {
                         
                         $scope.restaurantList =     
                                 restaurantFactory.getRestaurantList();
                         console.log("controller delete count "+
                                 $scope.restaurantList.length);
                      
                    }).
                    error(function (data, status, headers, config) {
                        messageFactory.raiseEvent("delete  error "+data);
                    }); 
            }
        };
        messageFactory.subscribe(onError, "ON_ERROR");
    }

    listRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory', 'messageFactory'];
    angular.module('restaurantApp')
            .controller('listRestaurantController', listRestaurantController);





}());