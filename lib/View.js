var Component = require('./Component.js'),
    Handlebars = require('Handlebars'),
    _ = require('lodash');

function View() {

};

View.prototype = new Component();
View.prototype.constructor = View;

_.extend(View.prototype, {
    layoutTemplate: null,
    pageTemplates: null,
    partialTemplates: {},
    page: {},
    scriptIncludes: [],
    styleIncludes: [],
    render: function () {

    }
});

module.exports = View;
