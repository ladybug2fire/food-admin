var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');
var _ = require('lodash')

var upload = multer({ dest: 'uploads/img/'});

router.post("/upload", upload.single('file'), function(req, res, next){
    let obj = req.file;
    let good = new Good({
        goodname : req.body.goodname,
        username : req.session.username,
        userid: req.session.userid,
        addTime: new Date().toLocaleString(),
        picUrl: '/img/' + obj.filename,
        desc: req.body.desc,
        status: 0,
        price: req.body.price,
    });
    good.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '发布成功'
            }) 
        }
     });
});

router.post('/add', function(req, res){
    var review = new Review(_.assign(_.pick(req.body,
        ['userid', 'username', 'foodid', 'desc', 'star']
    ), {
        addTime: new Date().toLocaleString(),
    }))
    review.save(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: '发布失败'
            })
        }else{
            res.json({
                code: 200,
                msg: '发表成功'
            })
        }
    })
})

router.get('/list', function(req, res){
    Review.find({foodid: req.query.id}).sort({"_id":-1}).exec(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '获取成功',
                data: result,
            })
        }
        
    })
})

module.exports = router;