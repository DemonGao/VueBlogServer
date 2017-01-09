const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Article = mongoose.model('Article')
const fn = () => {}

router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id
  Article.findOne({_id}, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

router.get('/api/getArticles', (req, res) => {
  Article.find({}, (err, doc) => {
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


router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  console.log(req.body);
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    tag : req.body.tag
  }
  if (id) {
    Article.findByIdAndUpdate(id, article, fn)
    res.send({status:true,msg:'文章已更新!'})
  } else {
    new Article(article).save()
    res.send({status:true,msg:'文章已发表!'})
  }
  res.status(200).end()
})

router.post('/api/deleteArticle', (req, res) => {
  Article.findByIdAndRemove(req.body._id, fn)
  res.status(200).end()
})



module.exports = router