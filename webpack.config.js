'use strict';

/**
 * module dependencies
 */

const fs = require('fs');
const inspect = require('util').inspect;
const path = require('path');

const _ = require('lodash');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

/**
 * exports
 */

const configs = module.exports = [];

/**
 * utils
 */

const make = o => _.assign(_.cloneDeep(base), o);

const base = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'syntax-async-functions',
            'transform-regenerator'
          ]
        }
      }
    ]
  },

  plugins: [
    function() {
      this.plugin('done', function(stats) {
        const opt = stats.compilation.options;
        const rel = path.relative(opt.context + '/app', opt.entry);
        STATS[rel] = rel.replace(/\.js$/, '.' + stats.hash + '.js');
        writeStats();
      });
    }
  ]
};

let i = 0;

const STATS = {};
const writeStats = _.debounce(function() {
  fs.writeFileSync(__dirname + '/public/js/stats.json', JSON.stringify(STATS, null, '  '), 'utf8');
}, 1 * 1000);

/**
 * lib
 */

const lib = make({
  entry: __dirname + '/app/js/lib.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'lib.js'
  }
});

configs.push(lib);

/**
 * app.js
 */

const app = make({
  entry: __dirname + '/app/js/app.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'app.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'jquery': 'jQuery',
    'superagent': 'superagent'
  }
});

configs.push(app);

/**
 * production 配置
 */

if (process.env.NODE_ENV === 'production' || argv.production) {
  for (let c of configs) {

    // hash form cache
    c.output.filename = c.output.filename.replace(/\.js$/, '.[hash].js');

    // compress
    delete c.devtool;
    c.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }
}