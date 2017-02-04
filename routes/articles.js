const dbHelper = require('../config/dbHelper');

const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Article = mongoose.model('Article')
const fn = () => {}

/***
 * 根据 id 获取文章
 */
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
/***
 * 分页获取文章
 */
router.get('/api/getArticles', function(req, res, next){
    const opts = req.query;
    var select = {};
    if(opts.tag!="all"){
        select = {tag:opts.tag}
    }
    let page = opts.page || 1;
    let pageSize = opts.pageSize || 2;
    dbHelper.pageQuery(page, pageSize, Article, '', select, {
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
router.post('/api/viewArticle', (req, res) => {
    const _id = req.body.id
    Article.update({_id},{'$inc':{'view':1}},(err,doc) =>{
        if (err) {
            res.send({status:false,msg:'您查看的文章不存在!'})
        }else{
            // res.status(200).end()
            res.send({status:true})
        }
    });
    // Article.findOne({_id}, (err, doc) => {
    //     if (err) {
    //         res.send({status:false,msg:'没有搜到此文章!'})
    //     } else if (doc) {
    //         // res.send({status:true,data:doc})
    //         Article.update({_id},{'$inc':{'view':1}});
    //     }
    // })
})
/***
 * 更新或发表文章
 */
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
/***
 * 删除文章
 */
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


module.exports = router