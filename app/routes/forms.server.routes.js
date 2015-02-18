module.exports = function (app) {

    var path = require('path'); 
    //rendering functions must define these first ////////////////////////////

    var formsPostRender = function (req, res) {

        var versionInfo = "(Via Post) Your name is '"+req.body.name+"'. " +
                
                "You requested version '"+req.body.version+"'";
        res.render('forms/mainForms', {
            title: 'Forms Demo',
            queryInfo: null,
            versionInfo:  versionInfo
        });

    };
    
    var formsGetRender = function (req, res) {

        var queryInfo = "(Via Get) Your name is '"+req.query.name+"'. " +
                
                "You requested version '"+req.query.version+"'";
        res.render('forms/mainForms', {
            title: 'Forms Demo', 
            versionInfo: null,
            queryInfo:  queryInfo
        });

    };
    
   var mainFormsRender = function (req, res) {

        res.render('forms/mainForms', {
            title: 'Forms Demo',
            versionInfo: null,
            queryInfo : null
        });

    };
    
    
    
///////////////////////////////////////////////////////////////////////
// routes
///////////////////////////////////////////////////////////////////////
        app.get('/formsDemo.doc', mainFormsRender);
        app.post('/formsDemoPost.doc',formsPostRender)
        app.get('/formsDemoGet.doc',formsGetRender)

}