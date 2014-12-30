(function () {

    var editRestaurantController = function ($scope, $log, restaurantFactory, messageFactory) {

        $scope.recordPresent = false;
        $scope.canAdd = true;
        var resetForm = function ()
        {
            messageFactory.raiseEvent("", "ON_ERROR");
            $scope.editRestaurantForm.$setPristine();
        }
        var newRestaurantHandler = function (restaurant)
        {
            $scope.editRestaurantForm.$setPristine();
            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = true;
            $scope.canAdd = true;
        }

        $scope.addNewRestaurant = function ()
        {
            $scope.currentRestaurant = restaurantFactory.createEmptyRestaurant();
            resetForm();
            $scope.recordPresent = true;
            $scope.canAdd = false;
        }
        var deleteRestaurantHandler = function (restaurant)
        {

            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = false;
            $scope.canAdd = true;
        }

        $scope.cancelClick = function ()
        {
            // $log.log("model con " + $scope.editRestaurantForm.name.$dirty)
            // $log.log("ngForm " + $scope.editRestaurantForm.$valid)
            if (typeof $scope.currentRestaurant.id === 'undefined'
                    || $scope.currentRestaurant.id == 0)
            {
                //add mode
                $scope.recordPresent = false;

            }
            else
            {
                restaurantFactory.restore();
                $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();

            }
            resetForm();
            $scope.canAdd = true;

        }

        $scope.saveClick = function ()
        {
            var errorMessage = null;
            // console.log("save click 1")
            if (!$scope.editRestaurantForm.$valid)
            {
                //console.log("save click 2")
                if ($scope.editRestaurantForm.zipCode.$error.pattern)
                {
                    errorMessage = "zip code must be a number"
                }

                if ($scope.editRestaurantForm.state.$error.pattern)
                {
                    errorMessage = "state must be a two letter combination, uppercase";
                }

                if ($scope.editRestaurantForm.version.$error.pattern)
                {
                    errorMessage = "version must be a number";
                }

            }
            errorMessage = restaurantFactory.validateRestaurant($scope.currentRestaurant);
            //console.log("save click 3 error '"+errorMessage +"'");
            if (errorMessage !== null)
            {
                messageFactory.raiseEvent(errorMessage, "ON_ERROR");
            }
            else
            {

                restaurantFactory.saveRestaurant($scope.currentRestaurant).
                        success(function (data, status, headers, config) {
                            $scope.canAdd = true;
                            $scope.recordPresent = false;
                            resetForm();

                        }).
                        error(function (data, status, headers, config) {
                            messageFactory.raiseEvent(data, "ON_ERROR");
                        });



            }
        }
        messageFactory.subscribe(newRestaurantHandler, "ON_RESTAURANT_CHANGE");
        messageFactory.subscribe(deleteRestaurantHandler, "ON_RESTAURANT_DELETE");
    }

    editRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory', 'messageFactory'];
    angular.module('restaurantApp')
            .controller('editRestaurantController', editRestaurantController);



}());