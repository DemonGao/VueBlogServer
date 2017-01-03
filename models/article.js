const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	/*
	//标题
	title : {
		type : String,
		default : '',
		trim : true,
	},
	//发布日期
	date : {
		type : Date,
		default : new Date(),
		trim : true,
	},
	//标签
	tag : {
		type : String,
		default : '',
		trim : true,
	},
	//内容
	content : {
		type : String,
		default : '',
	}
	*/
	title: String,
  	date: Date,
  	content: String
})

mongoose.model('Article', ArticleSchema);