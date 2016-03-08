/* 
 A demonstration filter, this kind of code can add to the req,
 creating a globablly defined variable. ALso demonstrates simple 
 use of log4js
 
 */
var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = function (req, res, next) {

    var choices = ['Get a job', 'Have a Nice Day', 'Made It Ma...Top of the World!', 'Carpe Diem', 'Go With The Flow'];
    if (req.session)
    {

        if (!req.session.motd)
        {
            req.session.motdIdx = 0;
        } else
        {
            req.session.motdIdx = (req.session.motdIdx + 1) % choices.length;
        }
        //store it in persistent area
        req.session.motd = choices[req.session.motdIdx];
        //expose it to ejs
        res.locals.motd = req.session.motd;
        //this is filter so release flow
        next();
        //logger.debug("message "+req.session.motd + " ");

    }
    else
    {
        next();
    }


}
