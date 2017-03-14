// var dbURL = 'mongodb://123.207.169.191:27017/blog';
// var dbOptions = {'user':'DemonGao','pass':'gsc19941024'};
// mongoose.connect(dbURL,dbOptions);

const path = require('path');
module.exports = {
    // mongodb: 'mongodb://localhost:11024/blog'
    mongodb: 'mongodb://demongao:demongao@123.207.169.191:11024/blog',
    root: path.resolve(__dirname, '../'), //根目录
    //七牛云 配置
    serverUrl:'http://cdn.demongao.com',
    qiniu_config:{
        //需要填写你的 Access Key 和 Secret Key
        accessKey:'IEbqTFc-DiMpHLrI16xWLr7tjl9HIG1QiXmi5PwP',
        secretKey:'PkT4WdNYV2ck5JEj4sPIZ7zYRSoPsqrLXzhNqLXd',
        bucket: 'cdn-demongao',
        origin: '',
    }
}