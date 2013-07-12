var _ = require('lodash');

function Component() {

}

Component.prototype = {
    config: {},
    setConfig: function (hash) {
        _.extend(Component.prototype.config, hash);
    }
};

module.exports = Component;