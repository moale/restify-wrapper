const { enhance } = require('../enhance');

describe('#enhance', () => {
  it('should add to instance the right key => value', () => {
    const foo = {};

    enhance(foo, 'bar', () => 42);

    expect(foo).toHaveProperty('bar');
    expect(typeof foo.bar).toBe('function');
  });

  it('should add an obj with setter and getter', () => {
    const foo = {};

    enhance(foo, 'bar', {
      setter(value) {
        this._myPrivateVar = value;
      },

      getter() {
        return this._myPrivateVar;
      },
    });

    expect(foo).toHaveProperty('bar');
    expect(foo.bar).toBeUndefined();

    foo.bar = 42;
    expect(foo.bar).toBe(42);
  });
});
