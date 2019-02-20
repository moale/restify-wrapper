const is = require('./is');

function curry(fn) {
  if (is.not.fn(fn)) {
    throw new TypeError();
  }

  const { length: k } = fn;

  return function curring(...outer) {
    const { length: i } = outer;

    if (i === k) {
      return fn(...outer);
    }

    if (i < k) {
      return (...inner) => curring.apply(null, [...outer, ...inner]);
    }
  };
}

module.exports = curry;
