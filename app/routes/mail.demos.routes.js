var fs = require('fs');
var EJS = require("ejs");
var nodemailer = require('nodemailer');
var uuid = require('node-uuid');

module.exports = function (app, config) {

    var htmlTemplate = fs.readFileSync('app/views/mailTemplates/mailTemplate.ejs').toString();

    var transporter = nodemailer.createTransport('smtps://expcalendar1000@gmail.com:'
            + config.mailPassword
            + '@smtp.gmail.com');


    ///console.log("do compile '"+config.mailPassword+"'");

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

        var uniqueCID = uuid.v4() + "-id";
        var data = {uniqueCID: "cid:" + uniqueCID};

        try
        {
            var html = EJS.render(htmlTemplate, data);

            var email = req.body.email;
            email = email.replace(/\s/g, '');
            if (email.length > 50)
            {
                var error = "email cannot be more than 50 chars";
                reportError(res, error)
                return console.log(error);
            }

            //console.log(html);
            var mailOptions = {
                from: '"Hack A Thon" <expcalendar@gmail.com>', // sender address
                //to: 'ddigital9000@gmail.com, '+
                //    'buzz@click.com', // list of receivers
                to: email,
                subject: 'Mailing Test', // Subject line
                html: html,

                attachments: [
                    {
                        filename: 'attach.png',
                        content: req.body.imageData.split('base64')[1],
                        encoding: 'base64',
                        cid: uniqueCID
                    }


                ]
            };
 
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reportError(res, error)
                    return console.log(error);
                }
                res.status(200);
                res.json({status: 'OK', message: info.response})
                console.log('Message sent: ' + info.response);
            });
 





        } catch (e)
        {
            reportError(res, e.message)
        }

    });


    // routes

    app.get('/mailDemo.doc', mailDemoRender);

}