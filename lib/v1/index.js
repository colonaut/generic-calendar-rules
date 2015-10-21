var ping = require('./handlers/pingHandler.js');

module.exports.register = function (plugin, options, next) {

    plugin.bind({
        config: plugin.app.config
    });

    plugin.route({
        path: "/v1/ping",
        method: "GET",
        handler: ping.handler,
        config: {
            description: 'ping route',
            tags: ['api']
        }
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('../../package.json')
};

