'use strict';

/**
 * Module dependencies
 */

const pify = require('promise.ify');
const fs = pify.all(require('fs-extra'));
const inspect = require('util').inspect;
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    c: 'clean',
    p: 'production',
  }
});

/**
 * clean
 */

if (argv.clean) {
  fs.removeSync(__dirname + '/static');
  fs.mkdirSync(__dirname + '/static');
  console.log('clean: done');
  process.exit(0);
}

/**
 * env
 */

if (argv.production) process.env.NODE_ENV = 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const prod = process.env.NODE_ENV === 'production';

/**
 * exports
 */

const config = module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './index.js',
    lib: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'jquery',
      'superagent'
    ],
  },
  output: {
    path: __dirname + '/static',
    filename: '[name].js',
    pathinfo: !prod,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [
        'react-hot',
        'babel-loader'
      ]
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('lib', '[name].js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],

  devServer: {
    contentBase: './static',
    hot: true
  }
};


// production 配置
if (process.env.NODE_ENV === 'production') {
  const c = config;

  // hash for cache
  c.output.filename = c.output.filename.replace(/\.js$/, '.[hash].js');
  c.plugins[0] = new webpack.optimize.CommonsChunkPlugin('lib', '[name].[hash].js');

  // compress
  delete c.devtool;
  c.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

/*
function() {
  this.plugin('done', function(stats) {
    const opt = stats.compilation.options;
    const arr = Array.isArray(opt.entry) ? opt.entry : [opt.entry];
    const entry = arr.pop();
    if (!entry) return;
    // const rel = path.relative(opt.context + '/app', entry);
    // STATS[rel] = rel.replace(/\.js$/, '.' + stats.hash + '.js');
    // writeStats();
  });
},
 */