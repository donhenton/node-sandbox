var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var authenticationMiddleware = require('./middleware')
var log4js = require('log4js');
var logger = log4js.getLogger('initPassport.js');
var usersService = require('./../../services/usersService')();


passport.serializeUser(function (user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
    usersService.findUser(username, cb)
})

function initPassport() {
    passport.use(new LocalStrategy(
            function (username, password, done) {
              //  logger.debug("pass word is "+password)
                usersService.findUser(username, function (err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }
                    if (password !== user.password) {
                      //  logger.debug("checking password '"+password+"' user '"+user.password+"'")
                        return done(null, false)
                    }
                    return done(null, user)
                })
            }
    ))

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
