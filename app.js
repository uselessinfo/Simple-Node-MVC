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
    router.route(req, res, "GET");
});

app.post('*', function (req, res) {
    router.route(req, res, "POST");
});

app.put('*', function (req, res) {
    router.route(req, res, "PUT");
});

app.delete('*', function (req, res) {
    router.route(req, res, "DELETE");
});

app.use(express.static(__dirname + '/public'));

app.listen(mvc.config.serverPort);