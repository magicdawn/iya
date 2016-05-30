'use strict';

/**
 * module dependencies
 */

const _ = require('lodash');

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
        exclude: /(node_modules|bower_components)/,
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
  }
};

/**
 * lib
 */

const lib = make({
  entry: __dirname + '/app/js/lib.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'lib.bundle.js'
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
    filename: 'app.bundle.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'jquery': 'jQuery',
    'superagent': 'superagent'
  }
});

configs.push(app);

if (process.env.NODE_ENV === 'production') {
  configs.forEach(c => {
    c.output.filename = c.output.filename.replace(/\.js$/, '.[hash].js');
  });
}