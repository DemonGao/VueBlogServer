/**
 * Created by demongao on 2017/3/14.
 */



const bytes = require('bytes');
const multer = require('multer');
// 配置multer
// 详情请见https://github.com/expressjs/multer
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: bytes('2MB') // 限制文件在2MB以内
    },
    fileFilter: function(req, files, callback) {
        // console.log(files);
        // 只允许上传jpg|png|jpeg|gif格式的文件
        var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|';
        var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
        callback(null, !!fileTypeValid);
    }
});

module.exports = upload;