/* 
 A demonstration filter, this kind of code can add to the req,
 creating a globablly defined variable. ALso demonstrates simple 
 use of log4js
 
 */
var log4js = require('log4js');
var logger = log4js.getLogger('secureChecker.js');
var url = require('url');


module.exports =
        function (config)
        {
            return function (req, res, next) {
                var url_parts = url.parse(req.url);
                   
                 logger.debug("entering filter")
                if (url_parts.path === '/auth')
                {
                     logger.debug("going to auth")
                    next();
                    return;
                }
                if (url_parts.pathname.match(/\/secure\//))
                {

                    if (!req.user)
                    {
                        var addedQ = "";
                        if (url_parts.search)
                        {
                            addedQ = url_parts.search.replace('?', '&');
                        }

                        var totalUrl = "/auth?goToURL="
                                + encodeURIComponent(url_parts.pathname)
                                + addedQ;
                         logger.debug("redirect to total URL "+totalUrl);
                       // res.redirect(totalUrl);
                       res.redirect('/auth')
                        return;
                    }
                    else
                    {
                        logger.debug("user was found ")
                        next();
                        return;
                    }
                } else
                {
                    logger.debug("not a security request")
                    next();
                    return;
                }


                next();

            }
        }
