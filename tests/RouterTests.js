var _ = require('lodash'),
    testCase = require('nodeunit').testCase,
    Router = require('../lib/Router.js');

exports['Router'] = testCase({
    setUp: function (cb) {
        cb();
    },
    tearDown: function (cb) {
        cb();
    },
    "parsePath method": function (test) {
        var router = new Router();

        _.each([
            {
                path: '/',
                controller: '',
                action: '',
                params: []
            },
            {
                path: '/home',
                controller: 'home',
                action: '',
                params: []
            },
            {
                path: '/home/dashboard',
                controller: 'home',
                action: 'dashboard',
                params: []
            },
            {
                path: '/home/dashboard/a/b',
                controller: 'home',
                action: 'dashboard',
                params: [ 'a', 'b' ]
            },
            {
                path: '/home/dashboard?a=1&b=2',
                controller: 'home',
                action: 'dashboard',
                params: []
            },
            {
                path: '/home/',
                controller: 'home',
                action: '',
                params: []
            }
        ], function (row) {
            var route = router.parsePath(row.path);

            test.equal(route.controller, row.controller, "Controller is correct");
            test.equal(route.action, row.action, "Action is correct");
            test.deepEqual(route.params, row.params, "Params are correct");

            test.done();
        });
    }
});

