const is = require('../is')

describe('#is', () => {
  describe('eq', () => {
    it('should compare the equality', () => {
      expect(is.eq(4, 4)).toBe(true);
      expect(is.eq(4, '4')).toBe(false);

      const arr = [1, 2, 3];
      const arr2 = [1, 2, 3];

      expect(is.eq(arr, arr2)).toBe(false);
    });
  });

  describe('str', () => {
    it('should check is a string', () => {
      expect(is.str('qwerty')).toBe(true);
      expect(is.str(123456)).toBe(false);
    });
  });

  describe('fn', () => {
    it('should check is a function', () => {
      const fn = (a) => a;
      function foo(a) {
        return a;
      }

      expect(is.fn(fn)).toBe(true);
      expect(is.fn(foo)).toBe(true);
    });
  });

  describe('num', () => {
    it('should check is a number', () => {
      expect(is.num(5)).toBe(true);
      expect(is.num(4.2)).toBe(true);
      expect(is.num('4.2')).toBe(false);
      expect(is.num('4')).toBe(false);
      expect(is.num(() => null)).toBe(false);
      expect(is.num({})).toBe(false);
    });
  });

  describe('arr', () => {
    it('should check is an array', () => {
      expect(is.arr([])).toBe(true)
      expect(is.arr([1,3.4,6])).toBe(true)
    })
  })

  describe('obj', () => {
    it('should check is an obj', () => {
      expect(is.obj({})).toBe(true)

      expect(is.obj([])).toBe(false)
      expect(is.obj(() => {})).toBe(false)
      expect(is.obj(42)).toBe(false)
      expect(is.obj('42')).toBe(false)
    })
  })

  describe('null', () => {
    it('should check is null', () => {
      expect(is.nul(null)).toBe(true)
      expect(is.nul(undefined)).toBe(false)
    })
  })

  describe('und', () => {
    it('should check is undefined', () => {
      expect(is.und(null)).toBe(false)
      expect(is.und(undefined)).toBe(true)
    })
  })

});

describe('is.not', () => {
  describe('not.eq', () => {
    it('should compare are not equality', () => {
      expect(is.not.eq(4, 4)).toBe(false);
      expect(is.not.eq(4, '4')).toBe(true);
    });
  });

  describe('not.str', () => {
    it('should check not a string', () => {
      expect(is.not.str('qwerty')).toBe(false);
      expect(is.not.str(123456)).toBe(true);
    });
  });

  describe('not.fn', () => {
    it('should check not a function', () => {
      const fn = (a) => a;
      function foo(a) {
        return a;
      }

      expect(is.not.fn(fn)).toBe(false);
      expect(is.not.fn(foo)).toBe(false);
    });
  });

  describe('not.num', () => {
    it('should check is not a number', () => {
      expect(is.not.num(5)).toBe(false);
      expect(is.not.num(4.2)).toBe(false);
      expect(is.not.num('4.2')).toBe(true);
      expect(is.not.num('4')).toBe(true);
      expect(is.not.num(() => null)).toBe(true);
      expect(is.not.num({})).toBe(true);
    });
  });

  describe('not.arr', () => {
    it('should check is not an array', () => {
      expect(is.not.arr([])).toBe(false)
      expect(is.not.arr([1,3.4,6])).toBe(false)
    })
  })

  describe('not.obj', () => {
    it('should check is not an obj', () => {
      expect(is.not.obj({})).toBe(false)
      expect(is.not.obj([])).toBe(true)
      expect(is.not.obj(() => {})).toBe(true)
      expect(is.not.obj(42)).toBe(true)
      expect(is.not.obj('42')).toBe(true)
    })
  })

  describe('not.null', () => {
    it('should check is not null', () => {
      expect(is.not.nul(null)).toBe(false)
      expect(is.not.nul(undefined)).toBe(true)
      expect(is.not.nul(5)).toBe(true)
      expect(is.not.nul('5')).toBe(true)
    })
  })

  describe('not.und', () => {
    it('should check is not undefined', () => {
      expect(is.not.und(null)).toBe(true)
      expect(is.not.und(undefined)).toBe(false)
    })
  })
})
