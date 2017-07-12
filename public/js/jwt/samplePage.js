 
 
 function submitTokenRequest(ev)
 {  
     
     ev.preventDefault();
     var targetArea = $('#tokenValue');
     var password = $('#password').val().trim();
     var username = $('#username').val().trim();
     //console.log("username "+u+" password "+p);
     var settings = {
         
         url: "/jwt/requestToken",
         method: "POST" ,
         data: {username: username, password: password}
         
     };
     
     $.ajax(settings)
             .done(function (data) {
                 console.log("success "+JSON.stringify(data))
         
         if (data.token)
         {
             targetArea.val(data.token.trim())
         }
         else
         {
             targetArea.val("null token ")
         }
                 
     }).fail(function(err) {
         
        // console.log("error "+JSON.stringify(err))
         var errorItem =  err.responseJSON.error;
         targetArea.val(errorItem)
     })
      
     
 }
 
 
 $("#tokenRequestSubmit").bind("click",submitTokenRequest)


