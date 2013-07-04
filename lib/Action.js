var Component = require('./Component.js'),
    _ = require('lodash');

function Action(name, callback) {
    if (!(this instanceof Action)) {
        return new Action(name, callback);
    }

    this.name = name;
    this.callback = callback;
}

Action.prototype = new Component();
Action.prototype.constructor = Action;

_.extend(Action.prototype, {

});

module.exports = Action;
