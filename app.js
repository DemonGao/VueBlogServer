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

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(articles);


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
