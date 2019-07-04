module.exports = {
  env: {
    mocha: true,
  },
  rules: {
    // Arrow functions can't access the Mocha context so we allow unnamed functions
    'func-names': 0,
  },
};
