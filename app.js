const fs = require('fs')
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon')
const logger = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')

// var index = require('./routes/index');
// var users = require('./routes/users');

const api = require('./api');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(api);

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


module.exports = app;
