
/**
 * 
 * @param {type} data {width: 400,height: 400, imageData: btoa(unescape(encodeURIComponent(str))) }
 * @returns {undefined}
 */
function sendMailData(data)
{

    function handleSuccess(data, status, xhr)
    {
        // console.log("SUCCESS "+JSON.stringify(data))
        $('#successArea').html("Successful mail send");
    }

    function handleError(xhr, status, errorMessage)
    {
        var errorDoc = "<div><pre>" + JSON.stringify(xhr) + "</pre></div>"
        $('#dangerArea').html(errorDoc);
        // console.log("ERROR "+JSON.stringify(xhr));


    }


    // var content = $('#bar1')[0].outerHTML;
    //$('#resultArea').text(content);
    var setup = {
        method: 'post',
        url: '/mailGraph',
        data: data,
        mimeType: 'application/json',
        error: handleError,
        success: handleSuccess,
        timeout: 1500

    }
    $.ajax(setup);


}


function cleanMessages()
{
    $('#successArea').empty();
    $('#dangerArea').empty();

}


function showEmailDialog()
{
    $('#dialogMailButton').prop('disabled', true);
    cleanMessages();
    $('#mailAddressModal').modal('show');

}



function validateEmail(box)
{
    var emailTest = $(box).val();
    var dotCount = emailTest.split(".").length - 1;
    var atCount = emailTest.split("@").length - 1;

    if (dotCount === 1 && atCount === 1)
    {
        $('#dialogMailButton').prop('disabled', false);
    } else
    {
        $('#dialogMailButton').prop('disabled', true);
    }
}


function closeDialog(action)
{
    console.log("action " + action)
    $('#mailAddressModal').modal('hide');


    if (action === 'confirm')
    {
        var email = $('#emailAddress').val();
        var imageObj = new Simg($('svg')[0]);
        imageObj.toImg(function (img) {
            //    console.log(img.src)
             sendMailData({imageData: img.src,email: email});
        })
    }
    // console.log("value "+email);
}


//////////// global actions ///////////////////////////////////

