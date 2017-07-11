module.exports = function (app, jwtService) {

    var path = require('path');
    //rendering functions must define these first ////////////////////////////
    var log4js = require('log4js');
    var logger = log4js.getLogger('jwt.routes.js');



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

    app.get('/jwt/loadSample.doc',
            function (req, res) {

                jwtService.generateToken(req, {}).then(function (token)
                {
                    res.render('jwt/samplePage', {
                        title: 'Web Tokens',
                        token: token,
                        isValid: ""
                    });
                },
                        function (err)
                        {
                            var errorMessage = "ERROR " + JSON.stringify(err)
                            res.render('jwt/samplePage', {
                                title: 'Web Tokens',
                                token: errorMessage,
                                isValid: ""
                            });
                        })


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
               jwtService.validateWebRequest(tokenValue,processResult)
               res.render('jwt/samplePage', {
                                title: 'Web Tokens',
                                token: tokenValue,
                                isValid:  validResult 
                            });


            });
       
            

}