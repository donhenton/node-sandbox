// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {


    var processForgetMe =  function (req, res)
    {
        res.clearCookie('remember');
        res.redirect('back');
    }

    var processRememberMe = function (req, res)
    {
        var minute = 60 * 1000;
        //console.log("remember switch "+req.body.remember);
        if (req.body.remember)
            res.cookie('remember', 1, {maxAge: minute});
        //this is a special directive to return to the referrer
        res.redirect('back');
    }


    var cookiePageRender = function (req, res) {

        //console.log("hitting cookie render");
        var checked = "";
        var rememberText = "Who are you?";
        var action = "cookies/rememberMe";
        var buttonText = "Submit"
        
        if (req.cookies.remember)
        {
            checked = "checked";
            rememberText = "I do remember you.";
            action = "cookies/forgetMe";
            buttonText = "Forget Me";
        }
        
        res.render('cookies/cookies', {
            title: 'Cookies',
            checked: checked,
            rememberText: rememberText,
            action: action,
            buttonText: buttonText
        });

    };


    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/cookies.doc', cookiePageRender);
    app.post('/cookies/rememberMe', processRememberMe);
    app.post('/cookies/forgetMe', processForgetMe);

};