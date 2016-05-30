'use strict';

const express = require('express');
const modern = require('express-modern');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', modern(function*(req, res) {
  res.send('hello world');
}));

app.listen(process.env.PORT || 4000, function() {
  process.title = `http://localhost:${ this.address().port }`;
  console.log(`server running at http://localhost:${ this.address().port }`);
});