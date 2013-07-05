var MVC = require('../lib/MVC.js'),
    mvc = MVC();

module.exports = mvc.Controller('User', [
    mvc.action('index', function (id) {
        this.response().send('USER!!!');
    })
]);