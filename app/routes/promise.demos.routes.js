module.exports = function (app) {


    var orderedPromisesRender = function (req, res) {

        res.render('promises/orderDemo', {
            title: 'Ordered Promise Demonstation'
        });

    };



    // routes

    app.get('/promiseOrderDemo.doc', orderedPromisesRender);

}