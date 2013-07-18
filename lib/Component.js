/** @module Component */

var _ = require('lodash');

/**
 * The base class for all MVC objects. Allows for global config and constants using a shared prototype.
 * @constructor
 * @property {Object} config Application-level config values
 * @alias module:Component
 */
function Component() {

}

Component.prototype = {
    config: {},

    /**
     * Extend the config property for all objects that inherit from Component with the passed in values
     * @param {Object} hash
     */
    setConfig: function (hash) {
        _.extend(Component.prototype.config, hash);
    }
};

/** @exports Component */
module.exports = Component;