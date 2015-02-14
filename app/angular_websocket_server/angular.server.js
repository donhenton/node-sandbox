/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (io, restaurantDaoService, json3) {

    console.log("called the angular search service");
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


        /**
         * this will search for a restaurant which have the string
         * in their name
         * 
         *  
         * @returns 
         * correlationId:
         * payload is an array of String names, 0...n
         */
        socket.on('restaurantRequest', function (dataInString) {
            var dataIn = json3.parse(dataInString)
            var data = {};
            if (!doesExist(dataIn.correlationId))
            {

                console.log("correlationId does not exist " + json3.stringify(dataIn));
                return;
            }
            ////////////
  
            restaurantDaoService.getByWordInName(dataIn.payload)
                    .then(function (items)
                    {
                        var restaurantNames = [];
                        for (var i = 0; i < items.length; i++)
                        {
                            restaurantNames.push(items[i].name);
                        }
                        ///////////// 
                        data.correlationId = dataIn.correlationId;
                        data.payload = restaurantNames;
                        socket.emit('restaurantResponse', data);
                    }
                    , function (err)
                    {
                        console.error(err.toString());
                    });

        });

    });

}
