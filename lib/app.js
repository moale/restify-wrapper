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
          if (p === "mount") {
            const method = target[p];
            return (opts, handlers) => {
              opts.path = `${prefix}${opts.path}`;
              return method.call(target, opts, handlers);
            };
          }

          return target[p];
        }
      });

      this.server.router = proxed;
      this.isProxed = true;
    }
    return cb();
  }
}

module.exports = App;
