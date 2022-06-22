'use strict';

module.exports = {
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Build scripts can depend on devDependencies
        devDependencies: true,
      },
    ],

    // We want to print errors to console during the build
    'no-console': 0,

    // Build files don't have "use strict" automatically added to them
    strict: ['error', 'safe'],
  },
};
