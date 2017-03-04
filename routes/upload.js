/**
 * Created by demongao on 2017/2/16.
 */
var express = require('express')

var upload =  require('./../config/multerUtil')

var config = require('./../config/config')
var router = express.Router();  //Express 路由

/**
 * .single(fieldname)
 * 接受一个以 fieldname 命名的文件. 这个文件的信息保存在 req.file
 * */
router.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据, 如果存在的话
    console.log(req.file);
    var file = req.file;
    // if(file.size>20000){
    //     console.log('图片太大!')
    // }
    if(req.file)
    upload.single('avatar')(req, res, function (err) {
        if (err) {
            // 发生错误
            return console.log(err)
        }
        req.file.path = '/public/uploads/'+req.file.filename;
        res.status(200).send({
            statu:1,
            result:req.file
        })
        //一切都好
        // console.log(req.file);
    });
})
/***
 * .array(fieldname[, maxCount])
 * 接受一个以 fieldname 命名的文件数组. 可以配置 maxCount 来限制上传的最大数量. 这些文件的信息保存在 req.files.
 */
router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据, 如果存在的话
})

/***
 * .fields(fields)
 * 接受指定 fields 的混合文件. 这些文件的信息保存在 req.files.
 * fields 应该是一个对象数组，应该具有 name 和可选的 maxCount属性.
 * Example:
 * [
 *    { name: 'avatar', maxCount: 1 },
 *    { name: 'gallery', maxCount: 8 }
 * ]
 */
var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files 是一个对象 (String -> Array) 键是文件名, 值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body 将具有文本域数据, 如果存在的话
})

module.exports = router;