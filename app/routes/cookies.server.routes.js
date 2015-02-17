// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {


    



   
    var cookiePageRender =function (req, res) {
        
         
        res.render('cookies/cookies', {
            title: 'Cookies' 
        });

    };


    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/cookies.doc', cookiePageRender);

};