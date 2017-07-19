// Invoke 'strict' JavaScript mode
'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('streaming.routes.js');
var url = require('url');
var http = require('http');


module.exports = function (app, config) {

    

    function generateCSV(type, res, req)
    {
        var fileName = 'download';
        res.setHeader('Content-disposition', 'attachment; filename=' + fileName + '.csv');
        res.set('Content-Type', 'text/csv');

        var limit = 200;
        var chunkCt = 0;
        var chunk = 'alpha,beta,chunk_ct\n';
        if (type && type !== 'small')
        {
            limit = 200000;
        }
        res.write(chunk);
        chunk = '';

        for (var i = 0; i < limit; i++)
        {
            chunk = chunk + "" + i + "," + (10 * i) + ","+(chunkCt)+ "\n";
            if (i % 20 === 0)
            {
                res.write(chunk);
                chunk = '';
                chunkCt ++ ;
            }

        }
        if (chunk.length > 0)
        {
            res.write(chunk);
        }
        res.status(200).end();



    }

    /* the csv generator */
    app.get('/streaming/csvdownload/:type',
            function (req, res, next) {
                var type = req.params.type;
                generateCSV(type, res, req);
            });


    app.get('/streaming/csvdownload/',
            function (req, res, next) {
                // next({clientMessage:"get a job",errorClass:"junk"})
                generateCSV('small', res, req);
            });


////////////proxy endpoint /////////////////////////////////////////////
//https://stackoverflow.com/questions/4771614/download-large-file-with-node-js-avoiding-high-memory-consumption
//https://nodejs.org/api/http.html#http_http_request_options_callback

app.get("/secure/proxyDownload", function (req, res, next) {


        var port = config.running_port;
        logger.debug("port is "+port)
 
         var options = {
            method: 'GET',
            path:   "/streaming/csvdownload/large",
            port: port,
            hostname: 'localhost',
            host: 'localhost',

            headers:
                    {
                        
                        'Transfer-Encoding': 'chunked'
                    }


        };
        
        // var body;
        // var dlprogress = 0;
         logger.debug("options "+JSON.stringify(options))
         
             
        var streamRequest = http.request(options,function(streamResponse)
        {
            logger.debug("File size: " + streamResponse.headers['content-length'] + " bytes.");
            
            res.setHeader('Content-disposition', 'attachment; filename=proxy_list.csv');
            res.set('Content-Type', 'text/csv');
            streamResponse.on('data', function (chunk) {
              //  dlprogress += chunk.length;
              //  body += chunk;
                res.write(chunk);
            }).on('end',function() {
                res.status(200).end();
                logger.debug("After download finished");
            })
        });
        streamRequest.on('error', function(e) {
                 next(e);
        });

       streamRequest.end();


    });





}//end main export module