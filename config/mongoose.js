const mongoose = require('mongoose');
const config = require('./config.js');

module.exports = function() {
	mongoose.Promise = global.Promise; //插入自己的 Promise 库
    const db = mongoose.connect(config.mongodb);
    
    const dbconnection = mongoose.connection
	dbconnection.on('error', function (err) {
		console.log(err);
	  console.log('MongoDB数据库连接失败.')
	})
	dbconnection.once('open', function () {
	  console.log('MongoDB数据库已连接.')
	})

	require('../models/article');
	require('../models/admin');
	require('../models/tag');
    return db;
}