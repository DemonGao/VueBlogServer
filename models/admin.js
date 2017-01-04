const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	//标签
	username : {
		type : String,
		default : '',
		trim : true,
	},
	//标签
	password : {
		type : String,
		default : '',
		trim : true,
	},
	//发布日期
	date : {
		type : Date,
		default : new Date(),
	}
})

mongoose.model('Admin', AdminSchema);