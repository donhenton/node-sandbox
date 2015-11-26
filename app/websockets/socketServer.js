/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = function (io, restaurantDaoService, json3) {
   
    require("./angular.server.js")(io,restaurantDaoService,json3);
}

