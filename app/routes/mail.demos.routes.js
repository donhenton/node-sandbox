var fs = require('fs');
var EJS = require("ejs");
var nodemailer = require('nodemailer');

module.exports = function (app) {

    var htmlTemplate = fs.readFileSync('app/views/mailTemplates/mailTemplate.ejs').toString();
    
    var transporter = nodemailer.createTransport('smtps://expcalendar1000@gmail.com:')
    var mailDemoRender = function (req, res) {

        res.render('mail/mailDemo', {
            title: 'Mail Demo'
        });

    };

    createError = function (message, classVar)
    {
        var e = {};
        e["message"] = message;
        e["errorClass"] = classVar;
        return e;
    };





    var reportError = function (res, errorString)
    {
        res.status(500);
        res.json(createError(errorString, "ErrorClass"));
    }
    //https://www.npmjs.com/package/ejs
    app.post('/mailGraph', function (req, res) {
        //req.body.data contains a string of the svg
        var data = {svgData:   req.body.data}
        try
        {
        var html = EJS.render(htmlTemplate,data);
        //console.log(html);
        res.status(200);
        res.json({status: 'OK'})
    }
    catch(e)
    {
        reportError(res,e.message)
    }
       
    });


    // routes

    app.get('/mailDemo.doc', mailDemoRender);

}