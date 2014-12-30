/**
 * 
 * create an angular messageFactory
 * 
 * @returns {undefined}
 */

(function () {
    var messageFactory = function ($log)
    {
        
        return messagePump;

    };

    messageFactory.$inject = ['$log'];

    angular.module('restaurantApp').factory('messageFactory', messageFactory);

}());