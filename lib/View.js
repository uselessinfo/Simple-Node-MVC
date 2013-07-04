var Component = require('./Component.js'),
    _ = require('lodash');

function View() {

};

View.prototype = new Component();
View.prototype.constructor = View;

_.extend(View.prototype, {

});

module.exports = View;
