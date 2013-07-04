var MVC = require('../lib/MVC.js'),
    mvc = MVC();

module.exports = mvc.controller('Home', [
    mvc.Action('index', function () {
        this.response().send('HOME!!!');
    }),
    mvc.Action('test', function (a, b) {
        this.response().send('TEST!!! ' + a + ' ' + b);
    }),
    mvc.Action('notFound', function () {
        this.response().send('Asset not found');
    })
]);
