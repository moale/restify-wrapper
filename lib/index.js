const EventEmitter = require('events');
const { enhance, is } = require('./utils/enhance');

class App extends EventEmitter {
  constructor(server) {
    super();

    this.register('server', server);
  }

  register(key, value) {
    enhance(this, key, value);

    return this;
  }

  routesAdd(route) {
    if (!is.fn(route)) {
      throw new Error('route must be a function');
    }

    route(this);

    return this;
  }
}

module.exports = App;
