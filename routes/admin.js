const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')
var Admin = mongoose.model('Admin')
const fn = () => {}

router.get('/api/login', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  Admin.findOne({username}, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({status:false,msg:err})
      return ;
    }
    if (doc==null) {
    	res.send({status:false,msg:'用户名不正确!'})
    	return ;
    }
    if (doc.password!=password){
      res.send({status:false,msg:'密码不正确!'})
      return ;
    }
    const id = doc._id;
    Admin.findOneAndUpdate({_id:id},{$set:{date:new Date()}},{upsert : true}, (err,admin)=>{
      admin.password = ''
      res.send({status:true,'admin':admin})
    })
  })
})

router.get('/api/reg', (req, res) => {
  // const id = req.body._id
  var admin = new Admin({username:'admin',password:'admin'});
  // if (id) {
  //   Admin.findByIdAndUpdate(id, admin, fn)
  // } else {
  admin.save()
  // }
  res.status(200).end()
})




module.exports = router