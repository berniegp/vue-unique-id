'use strict';

const path = require('path');
const buble = require('@rollup/plugin-buble');
const replace = require('@rollup/plugin-replace');
const packageVersion = require('../package.json').version;

const version = process.env.VERSION || packageVersion;

// eslint-disable-next-line operator-linebreak
const banner =
`/**
 * vue-unique-id v${version}
 * (c) ${new Date().getFullYear()} Bertrand Guay-Paquet
 * @license ISC
 */`;

function resolve(_path) {
  return path.resolve(__dirname, '../', _path);
}

const configs = {
  umdDev: {
    file: resolve('dist/vue-unique-id.js'),
    format: 'umd',
    env: 'development',
  },
  umdProd: {
    file: resolve('dist/vue-unique-id.min.js'),
    format: 'umd',
    env: 'production',
  },
  commonjs: {
    file: resolve('dist/vue-unique-id.common.js'),
    format: 'cjs',
  },
  esm: {
    file: resolve('dist/vue-unique-id.esm.js'),
    format: 'es',
  },
};

function genConfig(opts) {
  const config = {
    input: {
      input: resolve('src/plugin.mjs'),
      plugins: [
        replace({
          __VERSION__: version,
        }),
        buble(),
      ],
    },
    output: {
      banner,
      exports: 'default',
      file: opts.file,
      format: opts.format,
      name: 'VueUniqueId',
    },
  };

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }));
  }

  return config;
}

function mapValues(obj, fn) {
  const res = {};
  Object.keys(obj).forEach((key) => {
    res[key] = fn(obj[key], key);
  });
  return res;
}

module.exports = mapValues(configs, genConfig);
