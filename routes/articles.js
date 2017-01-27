const dbHelper = require('../config/dbHelper');

const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Article = mongoose.model('Article')
const fn = () => {}

router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id
  Article.findOne({_id}, (err, doc) => {
    if (err) {
      res.send({status:false,msg:'没有搜到此文章!'})
    } else if (doc) {
      res.send({status:true,data:doc})
    }
  })
})

// router.get('/api/getArticles', (req, res) => {
//   var opts = req.query;
//   console.log(opts);
//   var select = {};
//   if(opts.tag!="all"){
//     select = {tag:opts.tag}
//   }
//   Article
//     .find(select)
//     .exec((err, doc) => {
//       if (err) {
//         console.log(err)
//         res.send({status:false,msg:'服务器和您开了个小小的玩笑!'})
//       }else if (doc) {
//         if(doc.length==0){
//           res.send({status:false,msg:'没有查到数据...'})
//           return ;
//         }
//         res.send({status:true,data:doc})
//       }
//     })
// })


router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  
  const article = {
    title: req.body.title,
    // date: req.body.date,
    content: req.body.content,
    tag : req.body.tag,
    markdown : req.body.markdown,
    date : new Date()
  }
  console.log(article);
  if (id) {
    Article.findByIdAndUpdate(id, article, fn)
    res.send({status:true,msg:'文章已更新!'})
  } else {
    new Article(article).save()
    res.send({status:true,msg:'文章已发表!'})
  }
  res.status(200).end()
})

router.post('/api/delArticle', (req, res) => {
  const _id = req.body._id;
  Article.count({_id},(err,count)=>{
    if(count!=0){
      Article.remove({_id},(err,result)=>{
        if(err){
          console.log(err);
          res.status(200).send({status:false,msg:'删除失败!'})
        }else{
          console.log('文章删除成功!');
          res.status(200).send({status:true,msg:'文章已删除!'})
        }
      })
    }else{
       res.status(200).send({status:false,msg:'文章已被删除!'})
    }
  })
})

router.get('/api/getArticles', function(req, res, next){
    var opts = req.query;
    var select = {};
    if(opts.tag!="all"){
        select = {tag:opts.tag}
    }
    var page = req.query.page || 1;
    dbHelper.pageQuery(page, 3, Article, '', select, {
        date: 'desc'
    }, function(error, $page){
        if(error){
            next(error);
        }else{
            if($page.results.length==0){
              res.send({status:false,msg:'没有查到数据...'})
              return ;
            }
            res.send({status:true,data:$page})
        }
    });
})

module.exports = router