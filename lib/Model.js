var Component = require('./Component.js'),
    _ = require('lodash');

function Model() {
    if (!(this instanceof Model)) {
        return new Model(arguments);
    }
}

Model.prototype = new Component();
Model.prototype.constructor = Model;

_.extend(Model.prototype, {

});

module.exports = Model;