(function () {

    var reviewDAOService = function ($log,$http) {

        var daoService = {};
        
       daoService.addReview = function(currentRestaurant,newReview) 
       {               
           newReview.parentRestaurantId = currentRestaurant._id;
           newReview._id = null;
           return  $http.post(g_restaurantUrlBase+"review/"+currentRestaurant._id, newReview)
       }
       
       daoService.saveReview = function(currentRestaurant,newReview) 
       {
            var saveURL = g_restaurantUrlBase+"review/"
                    +currentRestaurant._id + "/"+newReview._id;
            return $http.put(saveURL, newReview);
       }
       
       daoService.deleteReview = function(currentRestaurant,newReview) 
       {
            var deleteURL = g_restaurantUrlBase+"review/"+currentRestaurant._id +
                    "/"+newReview._id;
            return $http.delete(deleteURL);
                     
       }
       
        return daoService;
    };
    reviewDAOService.$inject = ['$log','$http'];

    angular.module('restaurantApp').factory('reviewDAOService', reviewDAOService);

}());


