function compose(...fns) {

  if (fns.length === 0) {
    return (i) => i;
  }

  if(fns.length === 1) {
    return fns[0]
  }

  return (...args) => fns.reduce((a, b) => a(b(...args)));
}

module.exports = compose;
