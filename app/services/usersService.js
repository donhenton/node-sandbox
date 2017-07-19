
var log4js = require('log4js');
var logger = log4js.getLogger('usersService.js');



module.exports = function () {
    var user = {
        username: 'test',
        officialName: 'Bonzo Dog',
        password: 'test',
        roles: ['alpha', 'beta'],
        id: 0
    }
    var noRoleUser = {
        username: 'noroles',
        officialName: 'No Role Loser',
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







    usersService = {};

    usersService.findUser = function(username, callback) {
        for (var k = 0; k < users.length; k++)
        {
            // logger.debug("searching for user '"+username+"' comparing '"+users[k].username.trim()+"'")
            if (username.trim() === users[k].username.trim()) {
                // logger.debug("found user for "+username);
                return callback(null, users[k]);
            }
        }


        return callback(null); 
    }


    return usersService;

}