const fs = require('fs')
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon')
const logger = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

var mongoose = require('./config/mongoose.js');
var db = mongoose();

var articles = require('./routes/articles');
var admin = require('./routes/admin');
var tag = require('./routes/tag');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//11ss
// app.post('/api/setup', function (req, res) {
//   new db.User(req.body)
//     .save()
//     .then(() => {
//       res.status(200).end()
//       db.initialized = true
//     })
//     .catch(() => res.status(500).end())
// })

// app.get('*', function (req, res) {
//   const fileName = db.initialized ? 'index.html' : 'setup.html'
//   const html = fs.readFileSync(resolve('../' + fileName), 'utf-8')
//   // const html = fs.readFileSync(resolve('../setup.html'), 'utf-8')
//   res.send(html)
// })
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
app.use(articles);
app.use(admin);
app.use(tag);

module.exports = app;
