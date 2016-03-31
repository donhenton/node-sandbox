/* 
  This code demonstrates error handling in promises.
  The idea is to issue calls to reject with errors as parameters (issueReject)
  or runtimeErrors (throwErrorAtRuntime) which are erros. 
 
  the catch placed at the end of the chain will catch both of these
  if this code were on the server side in node, the catch clause 
  would issue a 'next(err)' call to forward to middleware error handlers



 */
// see http://blog.taylormcgann.com/2014/08/21/catch-errors-javascript-promise-chains/
var promiseDemo = {};
promiseDemo.report = function (info)
{
    $('#resultArea').append("<li>" + info + "</li>");
}
promiseDemo.issueReject = false;
promiseDemo.throwErrorAtRuntime = false;

/**
 * this is Step 3
 * @returns {Promise}
 */
promiseDemo.fetchData = function () {


    return new Promise(function (resolve, reject)
    {
        if (promiseDemo.issueReject)
        {
            promiseDemo.report('fetchData sending an error');
            reject(new Error("get a job"))
        } else
        {
            promiseDemo.report('fetchData sending successful array');
            resolve([1, 2, 3]);
        }


    });


}

promiseDemo.handleData = function () {
    return promiseDemo.fetchData()
            .then(function (data) {
                promiseDemo.report('in handleData ' + data);
                return data.reduce(function (memo, val) {
                    return memo + val;
                });

            }, function (error) {
                console.error('handle error: ' + error.stack);
                promiseDemo.report('in handleData error ' + error.message);
                //throw so its picked up by the next 
                throw error;
            });
}

/**
 * Initialized here Step 1 useData --> handleData --> fetchData
 *  
 * @returns {undefined}
 */
promiseDemo.showErrorInStart = function () {
    $('#resultArea').empty();
    promiseDemo.throwErrorAtRuntime = false;
    promiseDemo.issueReject = true;
    promiseDemo.useData();





}
promiseDemo.useData = function () {
    promiseDemo.report('starting in useData');
    promiseDemo.handleData()
            .then(function (result) {
                promiseDemo.report('in useData handleData returned ' + result);
                console.log('using ' + result);

                if (promiseDemo.throwErrorAtRuntime)
                {
                    // this should throw an error
                    console.report('using ' + result);

                } else
                {
                    console.log('using ' + result);
                }




            }, function (error) {
                console.error('use error: ' + error.stack);
                promiseDemo.report('in useData error ' + error.message);
                throw error;
            }).catch(function (error)
            {
                //this catches the above wrong function call 
                //because there are nor other error handler downstream
                promiseDemo.report('in useData catch ' + error.message);
            })
            .finally(function () {
                console.log('finish');
                promiseDemo.report('in useData finally ');
            });
}


promiseDemo.doRuntimeError = function ()
{
    $('#resultArea').empty();
    promiseDemo.throwErrorAtRuntime = true;
    promiseDemo.issueReject = false;
    promiseDemo.useData();
}


promiseDemo.showSuccess = function ()
{
    $('#resultArea').empty();
    promiseDemo.throwErrorAtRuntime = false;
    promiseDemo.issueReject = false;
    promiseDemo.useData();
}