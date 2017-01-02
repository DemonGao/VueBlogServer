const mongoose = require('mongoose')
const init = require('./init.json')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  pwd: String
})

const articleSchema = new Schema({
  title: String,
  date: Date,
  content: String
})

const linkSchema = new Schema({
  name: String,
  href: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Link: mongoose.model('Link', linkSchema),
  initialized: false
}

const initialize = function () {
  Models.User.find(null, function (err, doc) {
    if (err) {
      console.log(err)
    } else if (!doc.length) {
      console.log('Database opens for the first time...')
      Promise.all(init.map(item => new Models[item.type](item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    } else {
      Models.initialized = true
    }
  })
}
var dbURL = 'mongodb://123.207.169.191:27017/blog';
var dbOptions = {'user':'DemonGao','pass':'gsc19941024'};
/*需要将用户名授权 到blog  否则连接错误!*/
mongoose.connect(dbURL,dbOptions);
const db = mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
  initialize()
})

module.exports = Models