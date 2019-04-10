/**
 * {
    userId: String,
    Menuname: { type: String },
    foods: [ FoodSchema ],
    addTime: {type: String},
    isPublic: {type: Boolean},
    desc: {type: String},
}
 */

var Good = require("../../models/good.js");
var Menu = require("../../models/menu.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

router.get('/list', function(req, res){
    Menu.find().sort({"_id":-1}).exec(function(err, result){
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

router.get('/my', function(req, res){
    Menu.find({userid: req.query.id}, function(err, result){
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

router.post('/addfood', function(req,res){
    Menu.findOneAndUpdate({userid: req.body.id}, {$push:{foods:{...req.body.food}}}, function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '收藏成功',
            })
        }
    })
})

router.get('/delete', function(req, res){
    Menu.findByIdAndRemove(req.query.id, function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除',
            })
        }
    })
})

router.get('/get', function(req, res){
    Menu.findById(req.query.id, function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: 'success',
                data: result,
            })
        }
    })
})
module.exports = router;