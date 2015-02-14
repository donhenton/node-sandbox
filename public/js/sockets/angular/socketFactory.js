/* 
 * This factory is responsible for the socket.io setup. That is all
 * it does settings on the io object would be done here. Listeners for events
 * are done in other code (connectionService). This allows for code organized
 * by functionality and avoids a giant switchboard piece of code for all
 * the handlers and emitters
 * 
 */


var socketFactory = function ($log)
{
    
    var websocket = null;
    
    var socketFactoryFunctions = {};

    socketFactoryFunctions.get = function()
    {
        if (websocket == null)
        {
            websocket = io.connect(g_socketBase);
        }
        return websocket;
    }

    return socketFactoryFunctions;
};

socketFactory.$inject = ['$log' ];

    angular.module('serviceApp').factory('socketFactory', socketFactory);