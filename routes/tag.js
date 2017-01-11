const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Tag = mongoose.model('Tag')
const fn = () => {}

router.get('/api/getTags', (req, res) => {
  Tag.find({}, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({status:false,msg:'服务器和您开了个小小的玩笑!'})
    } else if (doc) {
      if(doc.length==0){
        res.send({status:false,msg:'没有查到数据...'})
        return ;
      }
      res.send({status:true,data:doc})
    }
  })
})


router.get('/api/saveTag', (req, res) => {
  const id = req.query._id;
  const tag = {
    tag : req.query.tag,
    date : new Date()
  }
  if (id) {
    Tag.findByIdAndUpdate(id, article, fn)
    res.send({status:true,msg:'标签已更新!'})
  } else {
    Tag.count({tag:req.query.tag}, function(err,count){
      if (count!=0) {
        res.send({status:false,msg:'标签已存在!'})
      }else{
        new Tag(tag).save();
        res.send({status:true,msg:'标签已添加!'})
      }
    });
  }
  // res.status(200).end()
})

module.exports = router