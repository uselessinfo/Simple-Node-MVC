/** @module Controller */

var _ = require('lodash'),
    Component = require('./Component.js'),
    proto = {
        /** @lends Controller.prototype */
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
        action: function (routeName, method) {
            return this.actions[method][routeName].callback;
        }
    };

/**
 * The Controller handles the coordination of resources needed to render a response to the client. To call an action on
 * the controller, the first section of the URL path must match the name of the controller supplied at construction.
 *
 * The Controller method itself acts as a factory, so when 'mvc.Controller()' is called, it returns a newly created
 * controller constructor that can then be used to create a new Controller instance for each request. This allows all
 * requests to remain atomic despite asynchronous nature of node.
 *
 * @example To call the 'update' action on the 'user' controller, the URL would look like 'mysite.com/user/update'
 *
 * @param {String} controllerName
 * @param {Array} actionArray
 * @returns {Function} A dynamically created Controller Type
 * @alias module:Controller
 */
function Controller (controllerName, actionArray) {
    var CustomController = function () {
        this._req = {};
        this._res = {};
    };

    CustomController.prototype = _.extend({}, new Component(), proto);
    CustomController.prototype.constructor = CustomController;
    CustomController.prototype.name = controllerName;
    CustomController.prototype.actions = {};
    CustomController.prototype.templates = {};

    _.each(actionArray, function(action) {
        if (!CustomController.prototype.actions[action.options.method]) {
            CustomController.prototype.actions[action.options.method] = {};
        }

        CustomController.prototype.actions[action.options.method][action.name] = action;
    });

    return CustomController;
};

module.exports = Controller;