/**
 * Created by demongao on 2017/3/20.
 */

const path = require('path');
module.exports = {
    // mongodb: 'mongodb://localhost:11024/blog'
    mongodb: 'mongodb://数据库用户名:数据库密码@ip地址1:端口号/数据库名称',
    root: path.resolve(__dirname, '../'), //根目录
    //七牛云 配置
    serverUrl:'加速地址',
    qiniu_config:{
        //需要填写你的 Access Key 和 Secret Key
        accessKey:'Access Key',
        secretKey:'Secret Key',
        bucket: 'bucket',
        origin: '',
    }
}