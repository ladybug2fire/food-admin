
var Menu = require("../../models/menu.js");
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    Menu.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/menu/list", {title: '菜单', layout: 'admin/layout', list: docs });
    })
});

router.get('/delete', function(req, res){
    Menu.findByIdAndRemove(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
});

module.exports = router;