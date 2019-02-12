const matchers = () => {
  return {
    eq: (a, b) => Object.is(a, b),
    str: (a) => typeof a === 'string',
    fn: (a) => typeof a === 'function',
    num: (a) => typeof a === 'number',
    arr: Array.isArray,
    obj: (a) => {
      const obj = Object(a);
      return obj.toString() === '[object Object]';
    },
    nul: (a) => a === null,
    und: (a) => a === void 0,
  };
};

const buildIs = () => {
  const allMatchers = matchers();

  const is = {
    not: {},
    ...allMatchers,
  };

  // make asymmetric matchers
  Object.keys(allMatchers).forEach((matcher) => {
    const matcherFn = allMatchers[matcher];

    is.not[matcher] = (...args) => !matcherFn(...args);
  });

  return is;
};

module.exports = buildIs();
