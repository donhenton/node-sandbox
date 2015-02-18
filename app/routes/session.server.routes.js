// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {


    var datePrint = function (dateInput) {
        var ty = typeof dateInput;
        var date = null;
        if (ty == 'string')
        {
            date = new Date(dateInput);
        }
        else
        {
            date = dateInput;
        }


        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        var finalDate = local.toJSON().slice(0, 10) + " " + local.getUTCHours() + ":"
                + pad(local.getMinutes(),2);

        return finalDate;

    }

    function pad(num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    }


    //rendering functions must define these first ////////////////////////////

    var sessionVariablesRender = function (req, res) {

        if (req.session.lastVisit) {
            console.log("found lastVisit " + req.session.lastVisit);
        }
        else
        {
            // Set the session's 'lastVisit' property
            req.session.lastVisit = new Date();
        }


        var lastVisitDate = datePrint(req.session.lastVisit);
        req.session.lastVisit = new Date();
        // Use the 'response' object to render the 'index' view with a 'title' property
        res.render('sessions/sessionVariables', {
            title: 'Session Variables',
            lastVisit: lastVisitDate,
            newLastVisit: datePrint(req.session.lastVisit)
        });

    };


    ///////////////////////////////////////////////////////////////////////
    // routes
    ///////////////////////////////////////////////////////////////////////
    app.get('/sessionVariables.doc', sessionVariablesRender);

};