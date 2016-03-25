module.exports = function (app) {

    var path = require('path'); 
    //rendering functions must define these first ////////////////////////////

     
    var errorHandlerMainRender = function (req, res) {

        res.render('errorhandling/main', {
            title: 'Error Handling Demonstation'
        });

    };
    
    var chainedRequestMainRender = function (req, res) {

        res.render('errorhandling/chainedRequestMain', {
            title: 'Chained Handlers'
        });

    };
//    var sendFileRender = function (req, res) {
//        //you are running in app/routes
//        var destFile = path.join(__dirname, '../../public/static', 'layout.html')
//        res.sendFile(destFile);
//    }
//    
//    var sendRender = function (req, res) {
//        //you are running in app/routes
//        var output = "<html><body><h3>Output</h3>";
//        output = output + "<p><a href='/'>Return to Main App</a></p></body></html>";
//        res.send(output);
//    }
    
    
    
///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
        app.get('/errorHandling.doc', errorHandlerMainRender);
        app.get('/chainedRequestMain.doc', chainedRequestMainRender);
       

}