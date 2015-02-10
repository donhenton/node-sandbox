/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (app, fs, vm) {
    app.get('*.tmpl', function (req, res) {

        var url = req._parsedUrl.pathname;
        url = url.substring(1, url.length - 5);
        console.log(req);
        var jsPath = './app/controllers/template/' + url + '.server.controller.js';
         
  

        console.log('jsPath ' + jsPath);
        if (fs.existsSync(jsPath)) {
            
            var code = fs.readFileSync(jsPath);
            var context = vm.createContext({req: req, res: res, url: url, console: console});
            vm.runInContext(code, context, jsPath);
        } else {
            res.render(url, req.query);
        }

 
    });

};