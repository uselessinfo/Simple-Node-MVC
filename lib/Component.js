var _ = require('lodash');

function Component() {

}

Component.prototype = {
    config: {},
    setConfig: function (hash) {
        _.extend(this.config, hash);
    }
};

module.exports = Component;