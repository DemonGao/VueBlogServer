const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Tag = mongoose.model('Tag')
const fn = () => {}

//获取全部标签
router.get('/api/getTags', (req, res) => {
  Tag.find({})
    .exec((err, doc) => {
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
/*
router.get('/api/getTags', (req, res) => {
  const CURRENTPAGE = req.query.currentPage;
  const PAGESIZE = req.query.pageSize;
  var skip_num = (CURRENTPAGE-1)*PAGESIZE;
  Tag
    .find({})
    .skip(skip_num)
    .limit(PAGESIZE)
    .exec(err, doc) => {
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

*/

//添加或修改标签
router.post('/api/saveTag', (req, res) => {
  const id = req.body._id;
  const tag = {
    tag : req.body.tag,
    date : new Date()
  }
  if (id) {
    Tag.findByIdAndUpdate(id, tag, fn)
    res.send({status:true,msg:'标签: '+tag.tag+' 已更新!',tag:tag.tag})
  } else {
    Tag.count({tag:req.body.tag}, function(err,count){
      if (count!=0) {
        res.send({status:false,msg:'标签: '+tag.tag+' 已存在!'})
      }else{
        new Tag(tag).save();
        res.send({status:true,msg:'标签: '+tag.tag+' 已添加!',tag:tag})
      }
    });
  }
})
//删除标签
router.post('/api/delTag',(req,res)=>{
  const _id = req.body._id;
  Tag.count({_id},(err,count)=>{
    if(count!=0){
      Tag.remove({_id},(err,result)=>{
        if(err){
          console.log(err);
          res.status(200).send({status:false,msg:'删除失败!'})
        }else{
          console.log('标签删除成功!');
          res.status(200).send({status:true,msg:'标签已删除!'})
        }
      })
    }else{
       res.status(200).send({status:false,msg:'标签已被删除!'})
    }
  })
})

module.exports = router