var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var authenticationMiddleware = require('./middleware')
var log4js = require('log4js');
var logger = log4js.getLogger('initPassport.js');

var user = {
    username: 'test',
    officialName: 'Bonzo Dog',
    password: 'test',
    roles: ['alpha', 'beta'],
    id: 0
}
var noRoleUser = {
    username: 'noroles',
    officialName: 'Bonzo Dog',
    password: 'noroles',
    roles: [],
    id: 1
}
var user2 = {
    username: 'user2',
    officialName: 'User 2',
    password: 'user2',
    roles: ['alpha', 'beta', 'gamma'],
    id: 2
}

var users = [user, noRoleUser, user2];







function findUser(username, callback) {
    for (var k = 0; k < users.length; k++)
    {
       // logger.debug("searching for user '"+username+"' comparing '"+users[k].username.trim()+"'")
        if (username.trim() === users[k].username.trim()) {
           // logger.debug("found user for "+username);
            return callback(null, users[k]);
        }
    }


    return callback(null)
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
})

function initPassport() {
    passport.use(new LocalStrategy(
            function (username, password, done) {
              //  logger.debug("pass word is "+password)
                findUser(username, function (err, user) {
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
