/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (io, restaurantDaoService,json3) {

    var doesExist = function (item)
    {
        if (typeof item == 'undefined'
                || item == null)
        {
            return false;
        }
        return true;
    };

    //socket.emit('blah', data) sends the data to the 'blah' event
    //socket.send(data) sends the data to 'message' event
    //socket.broadcast.emit or .send will send to everyone else 


    io.on('connection', function (socket) {





        // when the client emits 'typing', we broadcast it to others
        socket.on('restaurantRequest', function (dataInString) {
            var dataIn = json3.parse(dataInString)
            var data = {};
            if (!doesExist(dataIn.correlationId))
            {
               
                console.log("correlationId does not exist "+json3.stringify(dataIn));
                return;
            }
            
            // console.log("zz "+dataIn +" "+dataIn.correlationId);
            data.correlationId = dataIn.correlationId;
            data.payload = dataIn.payload+ " get a job from the server";
            socket.emit('restaurantResponse', data);
        });


    });





}
