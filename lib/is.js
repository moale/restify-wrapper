const matchers = () => {
  return {
    eq: (a, b) => a === b, // we should figure out another algo
    str: (a) => typeof a === 'string',
    fn: (a) => typeof a === 'function',
    num: (a) => typeof a === 'number',
    arr: Array.isArray,
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
