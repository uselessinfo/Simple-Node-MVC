var _ = require('lodash'),
    Component = require('./Component.js'),
    Controller = require('./Controller.js'),
    action = require('./Action.js'),
    Router = require('./Router.js'),
    Model = require('./Model.js'),
    View = require('./View.js');

function MVC() {
    if (!(this instanceof MVC)) {
        return new MVC();
    }
}

MVC.prototype = new Component();
MVC.prototype.constructor = MVC;

_.extend(MVC.prototype, {
    Controller: Controller,
    action: action,
    Router: Router,
    Model: Model,
    View: View
});

module.exports = MVC;