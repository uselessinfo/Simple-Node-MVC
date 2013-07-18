/** @module Action */

var Component = require('./Component.js'),
    _ = require('lodash');

/**
 * Actions are attached to controllers and can be called dynamically by making a request to
 * {Controller.name}/{Action.name}. Requests can be either GET, POST, PUT, or DELETE as specified in the options
 * parameter
 *
 * The options include:
 *  * method: "GET", "POST", "PUT", or "DELETE"
 *
 * @param {String} name The URL parameter name that will be used to access this action
 * @param {Function} callback The method to run when the action is called
 * @param {Object} options Additional options
 * @returns {Action}
 *
 * @constructor
 * @alias module:Action
 * @extends module:Component
 * @property {Object} options Class level configuration
 * @property {String} name The name through which this action can be accessed by a route
 * @property {Function} callback The method that will be run when routing to this action
 */
function Action(name, callback, options) {
    this.options = {
        method: "GET"
    };

    // Make the "new" keyword optional
    if (!(this instanceof Action)) {
        return new Action(name, callback);
    }

    _.extend(this.options, options);

    this.name = name;
    this.callback = callback;
}

Action.prototype = new Component();
Action.prototype.constructor = Action;

_.extend(Action.prototype, {
    /** @lends Action.prototype */
});

module.exports = Action;
