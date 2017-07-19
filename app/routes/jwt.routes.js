module.exports = function (app, jwtService) {

    var path = require('path');
    //rendering functions must define these first ////////////////////////////
    var log4js = require('log4js');
    var logger = log4js.getLogger('jwt.routes.js');
    var usersService = require('./../services/usersService')();
 

    ///////////////////////////////////////////////////////////////////////
    // jwtpages
    /////////////////////////////////////////////////////////////////////// 

    app.get('/jwt/samplePage.doc',
            function (req, res) {



                res.render('jwt/samplePage', {
                    title: 'Web Tokens',
                    token: "",
                    isValid: ""
                });
            });

    
    app.post('/jwt/validateSample.doc',
            function (req, res) {

                // {error: null, message: null, success: false}
                validResult = "nothing";
                function processResult(res)
                {
                    validResult = JSON.stringify(res)
                }



                var tokenValue = decodeURIComponent(req.body.tokenValue);
                tokenValue = tokenValue.trim();
                jwtService.validateWebRequest(tokenValue, processResult)
                res.render('jwt/samplePage', {
                    title: 'Web Tokens',
                    token: tokenValue,
                    isValid: validResult
                });


            });



    //////////////////////////////////////////////////////////////////////////
    //angular 4 security demo      
    //////////////////////////////////////////////////////////////////////////


    app.get('/secure/angular4/demoPage.doc',
            function (req, res) {



                res.render('jwt/angular4/securityDemo', {
                    title: 'Angular4 Security'
                });
            });

    //////////////////////////////////////////////////////////////////////////
    //jwt REST login endpoint
    //
    //////////////////////////////////////////////////////////////////////////


    app.post('/jwt/requestToken', function (req, res) {

        var username = req.body.username;
        var password = req.body.password;




        usersService.findUser(username, function (err, user) {


            var token = null;

            if (err) {
                res.statusCode = 500;
                res.json({error: "general error"});
                return;
            }
            if (!user) {
                res.statusCode = 403;
                res.json({error: "user '" + username + "' not found"});
                return;
            }
            if (password !== user.password) {
                //  logger.debug("checking password '"+password+"' user '"+user.password+"'")
                res.statusCode = 403;
                res.json({error: "user '" + username + "' found but password wrong"});
                return;
            }

            opts = {
                roles: user.roles,
                subValue: user.id
            }
   


            jwtService.generateToken(req, opts).then(function (token)
            {
                res.statusCode = 200;
                res.json({officialName: user.officialName, roles: user.roles, id: user.id, token: token})
            },
                    function (err)
                    {
                        logger.error("problem in token gen " + JSON.stringify(err))
                    })

            



        });


    });
}