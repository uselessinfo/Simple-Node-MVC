var fs = require('fs'),
    _ = require('lodash'),
    Component = require('./Component.js');

function Router () {
    this.controllers = {};

    console.log('Router created');
};

Router.prototype = new Component();
Router.prototype.constructor = Router;

_.extend(Router.prototype, {
    route: function (req, res) {
        var self = this,
            route = parsePath(req.path),
            params = route.params,
            controller = this.controllers[route.controller.toLowerCase()] && new this.controllers[route.controller.toLowerCase()]();

        console.log(JSON.stringify(route));

        if (controller && controller.action(route.action.toLowerCase() || this.CONFIG.defaultAction)) {
            controller.request(req);
            controller.response(res);
            controller.action(route.action.toLowerCase() || this.CONFIG.defaultAction).apply(controller, params);
        } else {
            // Shift everything down a level
            params = [route.action].concat(route.params);
            route.action = route.controller || this.CONFIG.defaultAction;
            route.controller = this.CONFIG.defaultController;

            controller = new this.controllers[route.controller]();

            controller.request(req);
            controller.response(res);

            console.log('Using home controller');
            console.log('Route: ' + JSON.stringify(route));

            if (controller.action(route.action.toLowerCase())) {
                controller.action(route.action.toLowerCase()).apply(controller, params);
            } else {
                controller.action(this.CONFIG.actionNotFound).apply(controller, params);
            }
        }
    },
    loadControllers: function () {
        var self = this;

        fs.readdir('./' + this.CONFIG.controllerPath + '/', function (err, files) {
            _.each(files, function (fileName) {
                self.controllers[fileName.replace('Controller.js','').toLowerCase()] = require('../' + self.CONFIG.controllerPath + '/' + fileName);
                console.log(fileName + ' loaded');
            });
        });
    }
});

function getParsedRoute(req) {
    var route = parsePath(req.path);
    route.query = req.query;

    return route;
};

function parsePath(path) {
    var qSplit = path.split('?') || [path],
        query = qSplit[1] || '',
        base = qSplit[0].replace(/^\//,''),
        map = ['controller', 'action'],
        out = {
            controller: '',
            action: '',
            params: [],
            query: {}
        };

    _.each(base.split('/'), function (value, index) {
        if (map[index]) {
            out[map[index]] = (value || '').toLowerCase();
        } else {
            out.params.push(value || '');
        }
    });

    return out;
};

module.exports = Router;