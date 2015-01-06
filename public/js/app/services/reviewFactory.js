/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var reviewFactory = function ($log, messageFactory, restaurantDAOService, reviewDAOService) {

        var factory = {};
        var currentRestaurant = null;

        factory.hasCurrentRestaurant = function ()
        {
            if (currentRestaurant == null)
                return false;
            else
                return true;
        }

        factory.transferReview = function (from, to)
        {
            to.id = from.id;
            to.parentRestaurantId = from.parentRestaurantId;
            to.reviewListing = from.reviewListing;
            to.stampDate = from.stampDate;
            to.starRating = from.starRating;
            if (typeof from.isEditing == 'undefined')
            {
                from.isEditing = false;
            }
            to.isEditing = from.isEditing;
        }

        factory.createEmptyReview = function (parentId)
        {
            var to = {};
            to.id = 0;
            to.parentRestaurantId = parentId;
            to.reviewListing = "";
            to.stampDate = (new Date()).getTime();
            ;
            to.starRating = 2;
            to.isEditing = false;
            return to;

        }
        factory.changeRestaurant = function (restaurant)
        {
            currentRestaurant = restaurant;
        }

        factory.addReview = function (newReview)
        {

         return   reviewDAOService.addReview(currentRestaurant, newReview).
                    success(function (data, status, headers, config) {
                        var reviews = currentRestaurant.reviews;
                        reviews.unshift(newReview);
                        newReview.id = data.id;
                    });

        }

        factory.saveReviewEdit = function (newReview)
        {

            return reviewDAOService.saveReview(currentRestaurant, newReview).
                    success(function (data, status, headers, config) {
                        var reviews = currentRestaurant.reviews;
                        for (var i = 0; i < reviews.length; i++)
                        {
                            if (reviews[i].id === newReview.id)
                            {
                                factory.transferReview(newReview, reviews[i]);
                                break;
                            }
                        }

                    });


        }

        factory.deleteReview = function (newReview)
        {
            return reviewDAOService.deleteReview(currentRestaurant, newReview).
                    success(function (data, status, headers, config) {
                        var reviews = currentRestaurant.reviews;
                        for (var i = 0; i < reviews.length; i++)
                        {
                            if (reviews[i].id === newReview.id)
                            {
                                reviews.splice(i, 1);
                                console.log("deleteReview " + i)
                                break;
                            }
                        }
                    });

        }

        factory.scatterCurrentReviews = function ()
        {
            var scatteredReviews = [];

            if (currentRestaurant == null)
            {
                // $log.log("current res null in reviewFactory")
                return [];
            }

            currentRestaurant.reviews.forEach(function (rev)
            {
                var newRev = {};

                factory.transferReview(rev, newRev);
                newRev.parentRestaurantId = currentRestaurant._id
                scatteredReviews.push(newRev);
            }
            )
            return   scatteredReviews;
        }

        return factory;
    };

    reviewFactory.$inject = ['$log', 'messageFactory', 'restaurantDAOService', 'reviewDAOService'];

    angular.module('restaurantApp').factory('reviewFactory', reviewFactory);


}());