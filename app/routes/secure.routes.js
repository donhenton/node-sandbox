 module.exports = function (app) {

    var path = require('path'); 
    var passport = require('passport')
    //rendering functions must define these first ////////////////////////////

    var renderSecureLogin = function (req, res) {

        res.render('secure/login', {
            title: 'Login page'
        });

    };
    var renderSecurePage = function (req, res) {

        res.render('secure/securePage', {
            title: 'Secured Page'
        });

    };
    var renderSecureMainPage = function (req, res) {

        res.render('secure/mainPage', {
            title: 'Security Demonstration'
        });

    }; 
    
    
    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
       // app.get('/secureLogin.doc', renderSecureLogin);
        app.get('/securePage.doc', passport.authenticationMiddleware(), renderSecurePage);
        app.get('/secureMainPage.doc', renderSecureMainPage);
        app.get('/login', renderSecureLogin);
        
        /**
         * setting up the login form
         */
        app.post('/login', passport.authenticate('local', {
             
            failureRedirect: '/login',
            successRedirect: '/securePage.doc'
        }))
        
        
        app.get('/logout',
            function(req, res){
                req.logout();
                renderSecureMainPage(req,res);
        });
        
        
 }