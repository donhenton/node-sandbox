module.exports = function (app,jwtService) {

    var path = require('path'); 
    //rendering functions must define these first ////////////////////////////

     
    
    
    
    
///////////////////////////////////////////////////////////////////////
// routes
///////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////
    // jwtpages
    /////////////////////////////////////////////////////////////////////// 
    
     app.get('/jwt/samplePage.doc',
            function (req, res) {

 

                res.render('jwt/samplePage', {
                    title: 'Web Tokens' 
                });
            });

}