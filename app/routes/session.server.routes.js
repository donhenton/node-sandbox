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
        var finalDate = local.toJSON().slice(0, 10)+" "+local.getUTCHours()+":"
        + local.getMinutes() ;
         
        return finalDate;

    }



    //rendering functions must define these first ////////////////////////////

    var sessionVariablesRender = function (req, res) {
        
        if (req.session.lastVisit) {
             console.log("found lastVisit "+req.session.lastVisit);
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