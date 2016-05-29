'use strict';

module.exports = {
  entry: {
    lib: __dirname + '/app/js/lib.js',
    main: __dirname + '/app/js/main.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = '[name].[chunkhash].js';
}