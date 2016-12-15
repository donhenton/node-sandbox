function mailImage()
{
    
    function handleSuccess(data,status,xhr)
    {
        console.log("SUCCESS "+JSON.stringify(data))
    }
    
    function handleError(xhr,status,errorMessage)
    {
        
        console.log("ERROR "+JSON.stringify(xhr));
        
        
    }
    
    
    var content = $('#bar1')[0].outerHTML;
    $('#resultArea').text(content);
    var setup = {
        method: 'post',
        url: '/mailGraph',
        data: {data: content},
        mimeType: 'application/json',
        error: handleError,
        success: handleSuccess,
        timeout: 1500 
         
    }
    $.ajax(setup);
    
    
}
