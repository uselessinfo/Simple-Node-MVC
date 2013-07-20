var _ = require('lodash'),
    Component = require('./Component.js');

function Router () {

}

Router.prototype = new Component();
Router.prototype.constructor = Router;

_.extend(Router.prototype, {
    controllers: {},
    templateCache: {},
    route: function (req, res, method) {
        var route = this.getParsedRoute(req),
            controller = this.controllers[route.controller.toLowerCase()] && new this.controllers[route.controller.toLowerCase()]();

        if (controller && controller.action(route.action.toLowerCase() || this.config.defaultAction, method || "GET")) {
            this.setupTemplates(route, controller);
            controller.request(req);
            controller.response(res);
            controller.action(method, route.action.toLowerCase() || this.config.defaultAction, method || "GET").apply(controller, route.params);
        } else {
            this.routeDefault(route, req, res, method);
        }
    },
    routeDefault: function (route, req, res, method) {
        var controller;

        this.shiftRouteForDefaultController(route);

        controller = new this.controllers[route.controller]();

        this.setupTemplates(route, controller);
        controller.request(req);
        controller.response(res);

        if (controller.action(route.action.toLowerCase())) {
            controller.action(route.action.toLowerCase(), method || "GET").apply(controller, route.params);
        } else {
            controller.action(this.config.actionNotFound, method || "GET").apply(controller, route.params);
        }
    },
    setupTemplates: function (route, controller) {
        controller.templates = _.merge({
            'layouts': this.templateCache.layouts,
            'partials': this.templateCache.partials
        }, this.templateCache[route.controller.toLowerCase()]);
    },
    shiftRouteForDefaultController: function (route) {
        // Shift everything down a level
        route.params = [route.action].concat(route.params);
        route.action = route.controller || this.config.defaultAction;
        route.controller = this.config.defaultController;
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