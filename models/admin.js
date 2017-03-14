const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');	//对用户密码进行hash加密
const AdminSchema = new Schema({
	//标签
	username : {
		type : String,
		unique: true, // 不可重复约束
		require: true // 不可为空约束
	},
	//标签
	password : {
		type : String,
		require: true,
	},
	token: {
		type: String
	},
	//发布日期
	date : {
		type : Date,
		default : new Date(),
	}
})

// // 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
// AdminSchema.pre('save', function (next) {
// 	var admin = this;
// 	if (this.isModified('password') || this.isNew) {
// 		bcrypt.genSalt(10, function (err, salt) {
// 			if (err) {
// 				return next(err);
// 			}
// 			bcrypt.hash(admin.password, salt, function (err, hash) {
// 				if (err) {
// 					return next(err);
// 				}
// 				admin.password = hash;
// 				next();
// 			});
// 		});
// 	} else {
// 		return next();
// 	}
// });
// // 校验用户输入密码是否正确
// AdminSchema.methods.comparePassword = function(passw, cb) {
// 	bcrypt.compare(passw, this.password, (err, isMatch) => {
// 		if (err) {
// 			return cb(err);
// 		}
// 		cb(null, isMatch);
// 	});
// };
mongoose.model('Admin', AdminSchema);