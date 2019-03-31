const EventEmitter = require("events");
const enhance = require("./utils/enhance");
const is = require("./utils/is");

class App extends EventEmitter {
  constructor(server) {
    super();
    this.register("server", server);
    this.isProxed = false;
  }

  register(key, value) {
    enhance(this, key, value);

    return this;
  }

  routesAdd(route) {
    if (is.not.fn(route)) {
      throw new TypeError("route must be a function");
    }

    route(this);

    return this;
  }

  group(prefix, cb) {
    if (!this.isProxed) {
      const router = this.server.router;

      const proxed = new Proxy(router, {
        get(target, p, receiver) {
          const method = target[p];

          if (method === "mount") {
            return prefix => (opts, handlers) => {
              opts.path = `${prefix}${opts.path}`;
              return method.bind(target, opts, handlers);
            };
          }

          return target[p];
        }
      });

      this.isProxed = true;
    }

    return cb();
  }
}

module.exports = App;
