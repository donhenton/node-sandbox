module.exports = function (app) {

    var path = require('path');
    var passport = require('passport');
    var url = require('url');
    var log4js = require('log4js');
    var logger = log4js.getLogger('secure.routes.js');
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
            function (req, res) {
                req.logout();
                renderSecureLocalMainPage(req, res);
            });

   
     

    ///////////////////////////////////////////////////////////////////////
    // routes secureChecker middleware
    /////////////////////////////////////////////////////////////////////// 

     app.get('/auth',
            function (req, res,next) {
                logger.debug("auth hit "+next)
                filterAuthenticationMiddleWare(req, res,next);
            });


    function filterAuthenticationMiddleWare(req, res, next) {
            
            logger.debug("filter 1")
             var sendToPath = '/';
            if (req.query.goToURL)
            {
                sendToPath = req.query.goToURL;
            }
            var url_parts = url.parse(req.url);
            //compute the passed q string
            var qString = "";
            if (url_parts.search)
            {
                var qValues = req.query;
                Object.keys(qValues).forEach(function (qq)
                {
                    if (qq !== 'serviceURL')
                    {
                        qString = qString + '&' + qq + '=' + qValues[qq];
                    }
                });
                if (qString.length > 0)
                {
                    qString = qString.substring(1);
                    sendToPath = sendToPath +"?"+ qString;
                }
            
            }// end search string exists
            
            
             logger.debug("filter 2");
            
            if (req.isAuthenticated()) {
                return next();
            }
             logger.debug("filter 3");
            res.render('secureLocal/login', {
                title: 'Login page'
            });
        }
    }


