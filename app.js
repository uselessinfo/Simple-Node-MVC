var express = require('express'),
    MVC = require('./lib/MVC.js'),
    app = express(),
    mvc = MVC(),
    router = new mvc.Router();

mvc.setConfig(require('./config.js'));

//Load controllers
mvc.loadTemplates();
mvc.loadControllers();

app.get('*', function (req, res) {
    router.route(req, res);
});

app.post('*', function (req, res) {
    router.route(req, res);
});

app.use(express.static(__dirname + '/public'));

app.listen(mvc.config.serverPort);