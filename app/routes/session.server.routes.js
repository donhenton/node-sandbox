// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    
    
    //rendering functions must define these first ////////////////////////////

    var sessionLoginTimeRender = function (req, res) {
        // If the session's 'lastVisit' property is set, print it out in the console 
         if (req.session.lastVisit) {
             console.log(req.session.lastVisit);
         }
         else
         {
         // Set the session's 'lastVisit' property
            req.session.lastVisit = new Date();
         }
         
         var visitDate = "Your last visit: "+ req.session.lastVisit;

        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('sessions/sessionLoginTime', {
            title: 'Session Variables',
            lastVisit: visitDate
        });

    };
    
    
    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/sessionLoginTime.doc', sessionLoginTimeRender);
         
};