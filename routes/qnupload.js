/**
 * Created by demongao on 2017/3/14.
 */
// Express.js以及路由
const express = require('express');
const router = express.Router();

const qn = require('qn');
const upload = require('./../config/qiniuUtil')
var config = require('./../config/config').qiniu_config;
var serverURL = require('./../config/config').serverUrl;;
router.post('/profile', function(req, res, next) {
    // 七牛相关配置信息
    let client = qn.create(config);
    // 上传单个文件
    // 这里`image`对应前端form中input的name值
    upload.single('avatar')(req, res, function(err) {
        if (err) {
            return console.error(err);
        }
        if (req.file && req.file.buffer) {
            // 上传到七牛

            var fileFormat = (req.file.originalname).split(".");
            // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);

            var filePath = '/upload/article/' + req.file.fieldname + '-' +Date.now() + '.' +fileFormat[fileFormat.length - 1];
            client.upload(req.file.buffer, {
                key: filePath
            }, function(err, result) {
                if (err) {
                    res.status(200).send({
                        statu:0,
                        msg:'上传失败'

                    });
                }
                res.status(200).send({
                    statu:1,
                    result:{
                        path:serverURL+filePath
                    }
                })
            });
        }
    });
})

module.exports = router;