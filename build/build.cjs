'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const terser = require('terser');
const rollup = require('rollup');
const configs = require('./configs.cjs');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

build(Object.keys(configs).map((key) => configs[key]));

function build(builds) {
  let built = 0;
  const total = builds.length;
  async function next() {
    try {
      await buildEntry(builds[built]);
      built++;
      if (built < total) {
        next();
      }
    } catch (e) {
      logError(e);
    }
  }

  next();
}

async function buildEntry({ input, output }) {
  const { file } = output;
  const isProd = /min\.js$/.test(file);
  const bundle = await rollup.rollup(input);
  const { output: [{ code }] } = await bundle.generate(output);
  if (isProd) {
    const result = await terser.minify(code, {
      toplevel: true,
      output: {
        ascii_only: true,
      },
    });
    return write(file, result.code, true);
  }
  return write(file, code);
}

async function write(dest, code, zip = false) {
  function report(extra) {
    console.log(`${blue(path.relative(process.cwd(), dest))} ${getSize(code)}${extra || ''}`);
  }

  fs.writeFile(dest, code, (err) => {
    if (err) {
      throw err;
    }

    if (zip) {
      zlib.gzip(code, (err, zipped) => {
        if (err) {
          throw err;
        }
        report(` (gzipped: ${getSize(zipped)})`);
      });
    } else {
      report();
    }
  });
}

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`;
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;
}
