var express = require('express'),
    MVC = require('./lib/MVC.js'),
    app = express(),
    mvc = MVC(),
    router = new mvc.Router();

mvc.setConfig(require('./config.js'));

//Load controllers
router.loadControllers();

app.get('*', function (req, res) {
    router.route(req, res);
});

app.post('*', function (req, res) {
    router.route(req, res);
});

app.use(express.static(__dirname + '/assets'));

app.listen(mvc.config.serverPort);