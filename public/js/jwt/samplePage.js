 
 
 function submitTokenRequest(ev)
 {  
     
     ev.preventDefault();
     var password = $('#password').val().trim();
     var username = $('#username').val().trim();
     //console.log("username "+u+" password "+p);
     
     
     
 }
 
 
 $("#tokenRequestSubmit").bind("click",submitTokenRequest)


