var MVC = require('../lib/MVC.js'),
    mvc = MVC();

module.exports = mvc.Controller('Home', [
    mvc.action('index', function () {
        this.response().send('HOME!!!');
    }),
    mvc.action('test', function (a, b) {
        this.response().send('TEST!!! ' + a + ' ' + b);
    }),
    mvc.action('notFound', function () {
        this.response().send('Asset not found');
    })
]);
