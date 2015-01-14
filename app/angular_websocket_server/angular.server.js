/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (io,restaurantDaoService) {

 

    // usernames which are currently connected to the chat
    var usernames = {};
    var numUsers = 0;

    io.on('connection', function (socket) {
        
        // when the client emits 'new message', this listens and executes
        socket.on('new message', function (data) {
             
        });

        

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function () {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            
        });
    });





}
