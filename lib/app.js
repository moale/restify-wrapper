const EventEmitter = require('events');
const enhance = require('./utils/enhance');
const is = require('./utils/is');

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
    if (is.not.fn(route)) {
      throw new TypeError('route must be a function');
    }

    route(this);

    return this;
  }
}

module.exports = App;
