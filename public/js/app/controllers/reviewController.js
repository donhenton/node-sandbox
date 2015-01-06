(function () {

    var reviewController = function ($scope, $log, reviewFactory, messageFactory) {

        $scope.addNewReviewBuffer = reviewFactory.createEmptyReview(0);

        $scope.hasCurrentRestaurant = function ()
        {
            return reviewFactory.hasCurrentRestaurant();
        }

        //live copy is passed in need to make a copy
        var newRestaurantHandler = function (restaurant)
        {

            reviewFactory.changeRestaurant(restaurant);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
            $scope.isAdding = false;
            $scope.addNewReviewBuffer = reviewFactory.createEmptyReview(restaurant._id);
            resetReviews();

        }


        var deleteRestaurantHandler = function (restaurant)
        {

            reviewFactory.changeRestaurant(null);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
            $scope.isAdding = false;
            $scope.addNewReviewBuffer = reviewFactory.createEmptyReview(0);
            resetReviews();


        }
        var resetReviews = function ()
        {

            $scope.currentReviews.forEach(function (r)
            {
                r.isEditing = false;
            }
            );
        }

        messageFactory.subscribe(newRestaurantHandler, "ON_RESTAURANT_CHANGE");
        messageFactory.subscribe(deleteRestaurantHandler, "ON_RESTAURANT_DELETE");


        $scope.isAdding = false;

        $scope.addNewReview = function (review)
        {
            $scope.addNewReviewBuffer = reviewFactory.createEmptyReview(0);
            $scope.isAdding = true;

        }
        $scope.cancelNewReview = function ()
        {
            $scope.isAdding = false;
        }

        $scope.saveNewReview = function ()
        {
            // console.log($scope.addReviewForm);
            if ($scope.addReviewForm.$valid)
            {
                var revCopy = {};
                reviewFactory.transferReview($scope.addNewReviewBuffer, revCopy);
                reviewFactory.addReview(revCopy).
                        success(function (data, status, headers, config) {
                            messageFactory.raiseEvent("", "ON_ERROR");
                            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
                            $scope.isAdding = false;
                        }).
                        error(function (data, status, headers, config) {
                            messageFactory.raiseEvent("problem with add review "+data, "ON_ERROR");     
                        });

            }
            else
            {
                messageFactory.raiseEvent("review text cannnot be blank", "ON_ERROR");
            }

        }
        $scope.deleteReview = function (review)
        {

            var r = window.confirm("Do you wish to delete this review?")

            if (r == true) {
                reviewFactory.deleteReview(review).
                        success(function (data, status, headers, config) {

                            $scope.cancelReviewEdit(review);

                        }).
                        error(function (data, status, headers, config) {
                            messageFactory.raiseEvent("unable to delete review "+data);
                        });


            }
        }

        $scope.editReview = function (review)
        {
            resetReviews();
            review.isEditing = true;
            $scope.isAdding = false;
        }
        $scope.saveReviewEdit = function (review)
        {
            review.isEditing = true;
            $scope.isAdding = false;

            if ($scope.editReviewForm.$valid)
            {
                reviewFactory.saveReviewEdit(review).
                        success(function (data, status, headers, config) {

                            $scope.cancelReviewEdit(review);
                            review.isEditing = false;

                        }).
                        error(function (data, status, headers, config) {
                            messageFactory.raiseEVENT("unable to save review");
                        });


            }
            else
            {
                messageFactory.raiseEvent("review text cannnot be blank", "ON_ERROR");
            }


        }
        $scope.cancelReviewEdit = function (review)
        {
            $scope.isAdding = false;
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
            resetReviews();
            $scope.editReviewForm.$setPristine();
        }
    }
    reviewController.$inject = ['$scope', '$log', 'reviewFactory', 'messageFactory', 'restaurantFactory'];
    angular.module('restaurantApp')
            .controller('reviewController', reviewController);

}());


