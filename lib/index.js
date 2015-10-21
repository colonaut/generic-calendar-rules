var hapi = require('hapi');
var server = new hapi.Server();
var config = require('../config/config.js');


server.connection({
        port: config.server.port,
        routes: {
            cors: true
        }
    }
);

var plugins = [
    {
        register: require('./v1'),
        options: config.server.options
    },
    {
        register: require('hapi-swagger')
    }
];

server.register(plugins, function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
});



server.route({
    method: 'GET',
    path: '/app.js',
    handler: {
        file: {
            path: 'dist/app.js',
            //filename: 'client.js', // override the filename in the Content-Disposition header
            mode: 'attachment', // specify the Content-Disposition is an attachment
            lookupCompressed: true // allow looking for script.js.gz if the request allows it
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '/static',
            index: true,
            listing: true
        }
    }
});

server.start(function (err) {
    if (err) {
        console.log("err", err);
    }
    console.log('server started');
});