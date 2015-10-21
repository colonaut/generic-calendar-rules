//module.exports = require('./lib');
var config = require('./config/config.js');
var hapi = require('hapi');

// creating the hapi server instance
var server = new hapi.Server();

// adding a new connection that can be listened on
server.connection({
    port: '8800',
    host: 'localhost',
    labels: ['web']
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: {
            path: 'static/app.html'
        }
    }
});

server.route({
    method: 'GET',
    path: '/img/{filename}',
    handler: function(request, reply){
        reply.file('static/img/' + request.params.filename)
    }
});

server.route({
    method: 'GET',
    path: '/js/{filename}.js',
    handler: function(request, reply){
        var foo = 'build/' + request.params.filename + '.js'
        reply.file(foo);
    }

});


// starting the server
server.start(function (err) {
    if (err) {
        throw err;
    }
});