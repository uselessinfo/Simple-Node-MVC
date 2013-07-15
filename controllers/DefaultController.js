var MVC = require('../lib/MVC.js'),
    Handlebars = require('Handlebars'),
    ViewModel = require('../models/ViewModel.js'),
    mvc = MVC();

module.exports = mvc.Controller('Default', [
    mvc.Action('index', function () {
        var viewModel = new ViewModel();

        viewModel.get('page').content = this.templates.index({}, {
            partials: this.templates.partials
        });

        this.response().send(this.templates.layouts.default(viewModel.attributes, {
            partials: this.templates.partials
        }));
    }),
    mvc.Action('test', function (a, b) {
        this.response().send('TEST!!! ' + a + ' ' + b);
    }),
    mvc.Action('notFound', function () {
        this.response().send('Asset not found');
    })
]);
