const EventEmitter = require('events');
const { enhance } = require('./utils');

class App extends EventEmitter {
    constructor(server) {
        super();

        this.register('server', server);
    }

    register(key, value) {
        enhance(this, key, value);

        return this;
    }

    routes(route) {
        if (typeof route !== 'function') {
            throw new Error('route must be a function');
        }

        route(this);

        return this;
    }
}

module.exports = App;
