module.exports = {
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    // Build files don't have "use strict" automatically added to them
    strict: ['error', 'safe'],
  },
};
