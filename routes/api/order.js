var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

// 查询当前用户的订单
router.get('/list', function(req, res){
    Order.find().sort({"_id":-1}).exec(function(err, result){
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

// 下单
router.post('/buy', async function(req, res) {
    let order = new Order(req.body);
    var goods = req.body.goods;
    try{
        var result = await order.save();
        try{
            var les = await Promise.all(goods.map(e=>{
                return Good.findByIdAndUpdate(e.goodid, {$inc:{amount: -e.count}})
            }))
            res.json({
                code: 200,
                msg: "下单成功"
            });
        }catch(err){
            res.json({
                code: 500,
                msg: err
            }); 
        }
    }catch(err){
        res.json({
            code: 500,
            msg: err
        }); 
    }
})



module.exports = router;