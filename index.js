'use strict';

const express = require('express');
const modern = require('express-modern');
const app = express();
const debug = require('debug')('iya:server');
const fs = require('promise.ify').all(require('fs-extra'));

app.use(modern(function*(req, res, next) {
  const statsPath = __dirname + '/public/js/stats.json';
  let stats;

  try {
    yield fs.accessAsync(statsPath, fs.F_OK);
    stats = JSON.parse(yield fs.readFileAsync(statsPath, 'utf8'));
  } catch (e) {
    console.error(e);
    return next();
  }

  const p = req.path.slice(1);
  if (p && stats[p]) {
    debug('sending %s -> %s', req.path, '/' + stats[p]);
    res.sendFile(__dirname + '/public/' + stats[p]);
  } else {
    next();
  }
}));

app.use(express.static(__dirname + '/public'));

app.get('/', modern(function*(req, res) {
  res.send('hello world');
}));

app.listen(process.env.PORT || 4000, function() {
  process.title = `http://localhost:${ this.address().port }`;
  console.log(`server running at http://localhost:${ this.address().port }`);
});