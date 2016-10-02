
module.exports = function(server, middleware) {
    var listeners = server.listeners('request').slice(0);
    server.removeAllListeners('request');
    server.on('request', function(req, res) {
        middleware(req, res, function(err) {
            if(err)
                return server.emit('error', err);
            listeners.forEach(function(listener) {
                listener.call(server, req, res);
            });
        });
    });
};
