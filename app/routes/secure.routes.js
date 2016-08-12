 module.exports = function (app) {

    var path = require('path'); 
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
        app.get('/secureLogin.doc', renderSecureLogin);
        app.get('/securePage.doc', renderSecurePage);
        app.get('/secureMainPage.doc', renderSecureMainPage);
        
 }