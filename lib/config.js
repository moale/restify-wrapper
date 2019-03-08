/*
default.js
default-{NODE_APP_INSTANCE}.js
{NODE_ENV}.js
{NODE_ENV}-{NODE_APP_INSTANCE}.js
{hostname}.js
{hostname}-{NODE_APP_INSTANCE}.js
{hostname}-{NODE_ENV}.js
{hostname}-{NODE_ENV}-{NODE_APP_INSTANCE}.js
local.js
local-{NODE_APP_INSTANCE}.js
local-{NODE_ENV}.js
local-{NODE_ENV}-{NODE_APP_INSTANCE}.js
 */

const { hostname } = require("os");
const { stat } = require("fs");

class Config {
  load(path) {
    stat(path, (err, stat) => {
      if (!stat.isDirectory) {
        // error here
      }
    });
  }
}

function Config(options) {
  const config = {
    get(key) {
      return config[key];
    }
  };

  this.load(options);

  return config;
}

Config.prototype.load = function(options) {
  const hostname = hostname();

  const files = [
    `default`,
    `default-${process.env.NODE_APP_INSTANCE}`,
    `${process.env.NODE_ENV}`,
    `${process.env.NODE_ENV}-${process.env.NODE_APP_INSTANCE}`,
    `${hostname}`,
    `${hostname}-${process.env.NODE_APP_INSTANCE}`,
    `${hostname}-${process.env.NODE_ENV}`,
    `${hostname}-${process.env.NODE_ENV}-${process.env.NODE_APP_INSTANCE}`,
    `local`,
    `local-${process.env.NODE_APP_INSTANCE}`,
    `local-${process.env.NODE_ENV}`,
    `local-${process.env.NODE_ENV}-${process.env.NODE_APP_INSTANCE}`
  ];
};

class Deferred {
  constructor(resolver) {
    this.resolver = resolver;
  }

  resolve(value) {
    return this.resolver.call(null, value);
  }
}

const defer = func => new Deferred(func);

const parse = value => {
  if (!Array.isArray(value)) {
    throw new TypeError("[parse function] accept only array");
  }

  return value.map(item => {
    const obj = Object(item);

    if (obj.toString() === "[object Object]") {
      return Object.keys(item).reduce((a, key) => {
        if (item[key] instanceof Deferred) {
          a[key] = item[key].resolve(item);
        } else {
          a[key] = item[key];
        }
        return a;
      }, {});
    } else {
      return item;
    }
  });
};
