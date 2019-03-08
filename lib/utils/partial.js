const is = require("./is");

function partial(fn) {
  if (is.not.fn(fn)) {
    throw new TypeError();
  }
}
