exports.enhance = function enhance(instance, name, value) {
  if (value && (typeof value.getter === 'function' || typeof value.setter === 'function')) {
    Object.defineProperty(instance, name, {
      get: value.getter,
      set: value.setter,
    });
  } else {
    instance[name] = value;
  }
};
