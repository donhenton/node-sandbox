 module.exports = function (app) {

    var path = require('path'); 
    var passport = require('passport')
    //rendering functions must define these first ////////////////////////////

    var renderSecureLocalLogin = function (req, res) {

        res.render('secureLocal/login', {
            title: 'Login page'
        });

    };
    var renderSecureLocalPage = function (req, res) {

        //console.log(JSON.stringify(req.user))
        res.render('secureLocal/securePage', {
            title: 'Secured Page',
            user: req.user
        });

    };
    var renderSecureLocalMainPage = function (req, res) {

        res.render('secureLocal/mainPage', {
            title: 'Security Demonstration'
        });

    }; 
    
    
    ///////////////////////////////////////////////////////////////////////
    // routes for local
    ///////////////////////////////////////////////////////////////////////
       // app.get('/secureLogin.doc', renderSecureLogin);
        app.get('/secureLocalPage.doc', passport.authenticationMiddleware(), renderSecureLocalPage);
        app.get('/secureLocalMainPage.doc', renderSecureLocalMainPage);
        app.get('/loginLocal', renderSecureLocalLogin);
        
        /**
         * setting up the login form
         */
        app.post('/loginLocal', passport.authenticate('local', {
             
            failureRedirect: '/loginLocal',
            successRedirect: '/secureLocalPage.doc'
        }))
        
        
        app.get('/logoutLocal',
            function(req, res){
                req.logout();
                renderSecureLocalMainPage(req,res);
        });
        
       
     
    ///////////////////////////////////////////////////////////////////////
    // routes for google
    /////////////////////////////////////////////////////////////////////// 
     
     
     
     
     
     
     
     
     
     
     
    ///////////////////////////////////////////////////////////////////////
    // routes for google
    ///////////////////////////////////////////////////////////////////////   
     
 }