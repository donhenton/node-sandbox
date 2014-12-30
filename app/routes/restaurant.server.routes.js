// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    var daoService = app.daoService;
    
    
    //@getRestaurant(id)
    app.get('/restaurant/:id', function (req, res) {

        var restaurantId = parseInt(req.params.id);
        console.log("restaurant id " + restaurantId);
        var restaurantFound = daoService.getRestaurantById(restaurantId);
        console.log("found "+restaurantFound);
        
        var resVar ={};
        resVar.biteMe = "get a job";
      
        
        if (restaurantFound == null)
        {
            resVar = daoService.createError('Not Found', "NotFoundClass");
            res.status(404);
            res.json(resVar);
        }
        else
        {
            resVar = restaurantFound;
            res.json(resVar);
        }
        

    });
    
    //@getAllRestaurants
    app.get('/restaurant', function (req, res) {
    res.json(daoService.getAllRestaurants());

});
    
    
    
    
    
    
    
    
};



 