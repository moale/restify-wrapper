const range = require("./../range");

describe("#range", () => {
  it("create an array of given size", () => {
    expect(range(4)).toHaveLength(4);
  });
});
