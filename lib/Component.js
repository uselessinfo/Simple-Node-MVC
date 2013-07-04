var _ = require('lodash');

function Component() {

}

Component.prototype = {
    CONFIG: {},
    config: function (hash) {
        _.extend(this.CONFIG, hash);
    }
};

module.exports = Component;