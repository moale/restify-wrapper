const curry = require('../curry');

describe('#curry', () => {
  it('throw if input is not a function', () => {
    expect(() => curry(42)).toThrow();
  });

  it('curry arity of 1', () => {
    const fn = (a) => a;

    const curred = curry(fn);

    expect(curred(42)).toBe(42);
  });

  it('curry arity of 2', () => {
    const fn = (a, b) => a + b;

    const curred = curry(fn);

    expect(curred(42)(42)).toBe(42 * 2);
  });

  it('curry arity of 3', () => {
    const fn = (a, b, c) => a + b + c;

    const curred = curry(fn);

    expect(curred(42)(42)(42)).toBe(42 * 3);
    expect(curred(42)(42, 42)).toBe(42 * 3)
    expect(curred(42, 42)(42)).toBe(42 * 3)
  });
});
