const compose = require('./../compose');

describe('#compose', () => {
  it('compose direction is RTL', () => {
    const double = (x) => x * 2;
    const add100 = (x) => x + 100;

    expect(
      compose(
        double,
        add100,
      )(2),
    ).toBe(204);

    expect(
      compose(
        add100,
        double,
      )(2),
    ).toBe(104);
  });

  it('throw if no function is given', () => {
    expect(() =>
      compose(
        (a) => a,
        33,
      )(1),
    ).toThrow();
  });

  it('call without args return an identity', () => {
    expect(compose()()).toBeUndefined()
    expect(compose()(42)).toBe(42)
  })

  it('call with one fn return the fn itself', () => {

    const fn = i => i

    expect(compose(fn)).toBe(fn)
  })
});
