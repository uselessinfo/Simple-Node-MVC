var View = require('../lib/View.js'),
    _ = require('lodash');

function DefaultView () {

}

DefaultView.prototype = _.extend(new View(), {

});

DefaultView.constructor = DefaultView;

module.exports = DefaultView;
