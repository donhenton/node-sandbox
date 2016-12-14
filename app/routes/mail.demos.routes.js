module.exports = function (app) {


    var mailDemoRender = function (req, res) {

        res.render('mail/mailDemo', {
            title: 'Mail Demo'
        });

    };



    // routes

    app.get('/mailDemo.doc', mailDemoRender);

}