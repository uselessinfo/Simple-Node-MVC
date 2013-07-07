var _ = require('lodash'),
    Component = require('./Component.js'),
    proto = {
        request: function (req) {
            if (req) {
                this._req = req;
            }
            return this._req;
        },
        response: function (res) {
            if (res) {
                this._res = res;
            }
            return this._res;
        },
        action: function (routeName) {
            return this.actions[routeName];
        }
    };

function Controller (controllerName, actionArray) {
    var NewController = function (controllerName, actionArray) {
        this._req = {};
        this._res = {};
    };

    NewController.prototype = _.extend({}, new Component(), proto);
    NewController.prototype.name = controllerName;
    NewController.prototype.actions = [];

    _.each(actionArray, function(action) {
        NewController.prototype.actions[action.name] = action.callback;
    });

    return NewController;
};

module.exports = Controller;