const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
	//标签
	tag : {
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

mongoose.model('Tag', TagSchema);