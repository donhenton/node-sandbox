/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// see http://blog.taylormcgann.com/2014/08/21/catch-errors-javascript-promise-chains/
var promiseDemo = {};
promiseDemo.report = function (info)
{
    $('#resultArea').append("<li>" + info + "</li>");
}
promiseDemo.throwError = false;
promiseDemo.throwErrorInResolve = false;

/**
 * this is Step 3
 * @returns {Promise}
 */
promiseDemo.fetchData = function () {


    return new Promise(function (resolve, reject)
    {
        if (promiseDemo.throwError)
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
 * @param {type} throwError
 * @returns {undefined}
 */
promiseDemo.showErrorInStart = function () {
    $('#resultArea').empty();
    promiseDemo.throwErrorInResolve = false;
    promiseDemo.throwError = true;
    promiseDemo.useData();





}
promiseDemo.useData = function () {
    promiseDemo.report('starting in useData');
    promiseDemo.handleData()
            .then(function (result) {
                promiseDemo.report('in useData handleData returned ' + result);
                console.log('using ' + result);

                if (promiseDemo.throwErrorInResolve)
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


promiseDemo.showErrorInResolve = function ()
{
    $('#resultArea').empty();
    promiseDemo.throwErrorInResolve = true;
    promiseDemo.throwError = false;
    promiseDemo.useData();
}


promiseDemo.showSuccess = function ()
{
    $('#resultArea').empty();
    promiseDemo.throwErrorInResolve = false;
    promiseDemo.throwError = false;
    promiseDemo.useData();
}