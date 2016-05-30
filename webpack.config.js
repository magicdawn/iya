'use strict';

module.exports = {
  entry: {
    lib: __dirname + '/app/js/lib.js',
    main: __dirname + '/app/js/main.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
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

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = '[name].[chunkhash].js';
}