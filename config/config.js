// var dbURL = 'mongodb://123.207.169.191:27017/blog';
// var dbOptions = {'user':'DemonGao','pass':'gsc19941024'};
// mongoose.connect(dbURL,dbOptions);

const path = require('path');
module.exports = {
    // mongodb: 'mongodb://localhost:11024/blog'
    mongodb: 'mongodb://demongao:demongao@123.207.169.191:11024/blog',
    root: path.resolve(__dirname, '../') //根目录
}