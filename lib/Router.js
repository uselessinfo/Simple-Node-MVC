var fs = require('fs'),
    _ = require('lodash'),
    Component = require('./Component.js');

function Router () {
    this.controllers = {};

    console.log('Router created');
}

Router.prototype = new Component();
Router.prototype.constructor = Router;

_.extend(Router.prototype, {
    route: function (req, res) {
        var route = this.getParsedRoute(req),
            controller = this.controllers[route.controller.toLowerCase()] && new this.controllers[route.controller.toLowerCase()]();

        if (controller && controller.action(route.action.toLowerCase() || this.config.defaultAction)) {
            controller.request(req);
            controller.response(res);
            controller.action(route.action.toLowerCase() || this.config.defaultAction).apply(controller, route.params);
        } else {
            this.routeDefault(route, req, res);
        }
    },
    routeDefault: function (route, req, res) {
        var controller;

        this.shiftRouteForDefaultController(route);

        controller = new this.controllers[route.controller]();

        controller.request(req);
        controller.response(res);

        if (controller.action(route.action.toLowerCase())) {
            controller.action(route.action.toLowerCase()).apply(controller, route.params);
        } else {
            controller.action(this.config.actionNotFound).apply(controller, route.params);
        }
    },
    shiftRouteForDefaultController: function (route) {
        // Shift everything down a level
        route.params = [route.action].concat(route.params);
        route.action = route.controller || this.config.defaultAction;
        route.controller = this.config.defaultController;
    },
    loadControllers: function () {
        var self = this;

        fs.readdir('./' + this.config.controllerPath + '/', function (err, files) {
            _.each(files, function (fileName) {
                self.controllers[fileName.replace('Controller.js','').toLowerCase()] = require('../' + self.config.controllerPath + '/' + fileName);
                console.log(fileName + ' loaded');
            });
        });
    },
    getParsedRoute: function (req) {
        var route = this.parsePath(req.path);
        route.query = req.query;

        return route;
    },
    parsePath: function (path) {
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
    }
});

module.exports = Router;