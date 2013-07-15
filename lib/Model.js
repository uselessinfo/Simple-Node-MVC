var Component = require('./Component.js'),
    _ = require('lodash');

function Model(options) {
    if (!(this instanceof Model)) {
        return new Model(arguments);
    }

    _.extend(this.attributes, this.defaults, options);
}

Model.prototype = _.extend(new Component(), {
    attributes: {},
    defaults: {},
    set: function (attributeName, value) {
        this.attributes[attributeName] = value;
    },
    get: function (attributeName) {
        return this.attributes[attributeName];
    },
    serialize: function () {
        return JSON.stringify(this.attributes);
    }
});

Model.prototype.constructor = Model;

module.exports = Model;