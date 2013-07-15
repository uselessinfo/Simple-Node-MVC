var Model = require('../lib/Model.js'),
    _ = require('lodash');

function ViewModel (options) {
    Model.prototype.constructor.apply(this, options);
}

ViewModel.prototype = _.extend(new Model(), {
    defaults: {
        page: {
            content: '',
            title: '',
            description: '',
            styleIncludes: [],
            scriptIncludes: [],
            headScriptIncludes: []
        }
    }
});

ViewModel.prototype.constructor = ViewModel;

module.exports = ViewModel;