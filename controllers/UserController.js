var MVC = require('../lib/MVC.js'),
    mvc = MVC();

module.exports = mvc.Controller('User', [
    mvc.Action('index', function (id) {
        this.response().send('USER!!!');
    })
]);