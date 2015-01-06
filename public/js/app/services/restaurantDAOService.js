(function () {

    var restaurantDAOService = function ($log, $http) {

        var daoService = {};
        var localRestaurantCopy = null;
        var restaurantListIndex = {};
        //@
        var setUpRestaurantList = function ()

        {
            
            var restaurantItems = daoService.getAllRestaurants();
            if (restaurantItems.length == 0)
                return;
            restaurantListIndex = {};
            restaurantItems.forEach(function (restaurant)
            {
                restaurantListIndex[restaurant._id] = restaurant;
                if (typeof restaurant.reviews == 'undefined')
                {
                    restaurant.reviews = [];
                }
            });

        };

        //@
        daoService.loadRestaurant = function (destRestaurant, sourceRestaurant)
        {
            destRestaurant.name = sourceRestaurant.name;
            destRestaurant.zipCode = sourceRestaurant.zipCode;
            destRestaurant.city = sourceRestaurant.city;
            destRestaurant.state = sourceRestaurant.state;
            destRestaurant.version = sourceRestaurant.version;
            destRestaurant.is_current = sourceRestaurant.is_current;
            destRestaurant._id = sourceRestaurant._id;
        }
        //@
        daoService.getRestaurantById = function (id)
        {
            
            var r =  restaurantListIndex[id];
            if (typeof r ==='undefined' || r ===null)
            {
                console.log("lookup fail "+id + '    '+restaurantListIndex.length);
            }
            return r;
        };

        //@
        daoService.getAllRestaurants = function ()
        {
            return localRestaurantCopy;

        };

        daoService.init = function ()
        {
            return  $http.get(g_restaurantUrlBase).
                    success(function (data, status, headers, config) {
                        console.log("dao init ")
                        console.log(data);
                        localRestaurantCopy = data;
                        setUpRestaurantList();
                    }).
                    error(function (data, status, headers, config) {

                    });
        }
        
         /** //@
         * the service will return either {id: XXXX} on success 
         * or {{message: "XXX" errorClass: "XXX}
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.saveRestaurant = function (newRestaurant)
        {
            return $http.put(g_restaurantUrlBase  + newRestaurant._id, newRestaurant).
                    success(function (data, status, headers, config) {
                        var lookup = daoService.getRestaurantById(newRestaurant._id);
                        console.log("save lookup "+lookup._id);
                        daoService.loadRestaurant(lookup, newRestaurant);
                    }) ;

        };
        
        /**
         * //@
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.addRestaurant = function (r)
        {
            r._id = null;
            return  $http.post(g_restaurantUrlBase, r).
                    success(function (data, status, headers, config) {
                        daoService.getAllRestaurants().unshift(r);
                        r.reviews = [];
                        r._id = data._id;
                    }) ;
             
        }
        //@
        daoService.deleteRestaurant = function (restaurant)
        {

            console.log("delete restaurant daoService");
            return  $http.delete(g_restaurantUrlBase  + restaurant._id).
                    success(function (data, status, headers, config) {
                        console.log("delete restaurant daoService 2");
                        var idx = -1;
                        var resCollection = daoService.getAllRestaurants();
                        for (var i = 0; i < resCollection.length; i++)
                        {
                            if (resCollection[i]._id === restaurant._id)
                            {
                                idx = i;
                                break;
                            }
                        }
                        if (idx > -1)
                        {
                            resCollection.splice(idx, 1);
                            setUpRestaurantList();
                        }

                    }).error(function (data, status, headers, config) {
                        console.log("dao delete error "+status);
                    } )

        }

        return daoService;
    };
    restaurantDAOService.$inject = ['$log', '$http'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


