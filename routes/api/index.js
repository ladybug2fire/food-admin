var User = require("../../models/user.js");
var Menu = require("../../models/menu.js");
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    User.find(function(err, docs){
        // res.json(docs)
        res.render("admin/user/list", {title: '用户管理', layout: 'admin/layout', list: docs });
    })
});

router.post('/register', function(req, res){
    User.find({ username: req.body.username}, function(err, result){
        if(result.length){
            res.json({
                code: 500,
                msg: '用户名已经被占用'
            })
        }else{
            var user = new User({
                username : req.body.username,
                password: req.body.password,
            });
            user.save(function (err, result) {
                if (err) {
                    console.log("Error:" + err);
                    res.json({
                        code: 500,
                        msg: err,
                    })
                }
                else {
                    var defaultMenu = new Menu({
                        userid: result._id,
                        username: result.username,
                        menuname: `${result.username}的菜单`,
                        addTime: new Date().toLocaleString(),
                        ispublic: true,
                    });
                    defaultMenu.save(function(err, savedMenu){
                        if(err){
                            res.json({
                                code: 500,
                                msg: err,
                            })
                        }else{
                            res.json({
                                code: 200,
                                msg: '创建账号成功'
                            }) 
                        }
                    })
                }
            });
        }
    })
})

router.post('/login', function(req, res){
    User.findOne({ username: req.body.username, password: req.body.password}, function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: '没有此用户'
            })
        } else{
            if(result && result.password === req.body.password){
                res.json({
                    code: 200,
                    msg: '登入成功',
                    data: result
                }) 
            }else{
                res.json({
                    code: 500,
                    msg: '密码错误'
                }) 
            }
        }
    })
})

// 编辑要修改下
router.post('/updateUser', function(req, res){
    User.findByIdAndUpdate(req.body._id, req.body, function(err, result){
        if (err) {
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '更新成功',
            }) 
        }
    })
})

router.get('/delete', function(req, res){
    User.findByIdAndRemove(req.query.id, (err, result)=>{
        if(err){
            res.json({
                code: 500,
                msg: '异常'
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