/**
 * 
 * create an angular messageFactory
 * 
 * @returns {undefined}
 * https://rclayton.silvrback.com/passing-state-via-services
 */

angular.module('app.services').service('MessagePumpService', messageService);
 function messageService ($log)
{
    var cache = {};
    
  
  //the ident and cache were used to prevent multiple calls and registrations
  //with the message pump, but apparently controller (folder-contents.clt.js)
  //init code is not called multiple times so such precautions aren't 
  //necessary
  
  
  this.register = function(fn,eventType,ident)
  {
      if (typeof cache[ident] === 'undefined')
      {
        cache[ident] = 1;
        messagePump.subscribe(fn,eventType);
       // $log.debug("hit register "+eventType+" "+ident);
      }  
      else
      {
         // $log.debug("already registered "+eventType+" "+ident);
      }
      
      
  }
  
   

};





 