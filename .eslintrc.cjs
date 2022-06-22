module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    // Trailing commas on function arguments is just silly
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],

    // Saving 2 characters is not worth the potential errors
    curly: 'error',

    // A chain of 'if' and 'else if' statements is clearer than multiple individual 'if' blocks
    'no-else-return': ['error', { allowElseIf: true }],

    // Finding good names is hard so allow reuse
    'no-param-reassign': 0,

    // Increment with += 1 is just too long to type
    'no-plusplus': 0,

    // Finding good names is hard so allow reuse
    'no-shadow': 0,

    // This is still the best way to express the private api intent
    'no-underscore-dangle': ['error', { allowAfterThis: true }],

    // Allow functions to be used before defined because:
    // 1) they are hoisted;
    // 2) it allows code ordering that moves helper functions to the bottom.
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    // To allow comment blocks that are actually section headers
    'spaced-comment': ['error', 'always', { exceptions: ['/'] }],
  },
};
