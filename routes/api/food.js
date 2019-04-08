var Food = require("../../models/food.js");
var express = require("express");
var router = express.Router();
var _ = require("lodash");
var multer = require("multer");

var upload = multer({ dest: "uploads/img/" });

router.get("/", function(req, res) {
  Food.find(function(err, docs) {
    if (err) {
      res.json({
        code: 500,
        msg: "错误"
      });
    } else {
      res.json({
        code: 200,
        data: docs
      });
    }
  });
});

router.post("/upload", upload.single("file"), function(req, res, next) {
  let obj = req.file;
  res.json({
    code: 200,
    msg: "success",
    data: "/img/" + obj.filename
  });
});

router.post("/add", function(req, res) {
  Food.find({ foodname: req.body.foodname }, function(err, result) {
    if (result.length) {
      res.json({
        code: 500,
        msg: "该菜名已经被占用"
      });
    } else {
      var jsonObj = _.assign(
        _.pick(req.body, [
          "foodname",
          "tags",
          "diffculty",
          "cookTime",
          "prepareTime",
          "price",
          "picUrl",
          "material"
        ]),
        {
          addTime: new Date().toLocaleString()
        }
      );
      console.log("req.body", jsonObj);

      var food = new Food(jsonObj);
      food.save(function(err, result) {
        if (err) {
          console.log("Error:" + err);
          res.json({
            code: 500,
            msg: err
          });
        } else {
          res.json({
            code: 200,
            msg: "添加成功"
          });
        }
      });
    }
  });
});

router.post("/login", function(req, res) {
  Food.findOne({ foodname: req.body.foodname }, function(err, result) {
    if (err) {
      res.json({
        code: 500,
        msg: "没有此用户"
      });
    } else {
      if (result.password === req.body.password) {
        res.json({
          code: 200,
          msg: "登入成功"
        });
      } else {
        res.json({
          code: 500,
          msg: "密码错误"
        });
      }
    }
  });
});

router.get("/new", function(req, res) {
  res.render("admin/food/new", { title: "创建用户", layout: "admin/layout" });
});

// 编辑要修改下
router.post("/edit", function(req, res) {
  console.log(req.body.name, req.body);
  Food.find({ foodname: req.body.foodname }, function(err, result) {
    if (result.length) {
      res.send("foodname is in used");
    } else {
      var food = new Food({
        foodname: req.body.foodname,
        password: req.body.foodname,
        phone: req.body.phone
      });
      food.save(function(err, result) {
        if (err) {
          console.log("Error:" + err);
          res.json({
            code: 500,
            msg: err
          });
        } else {
          res.json({
            code: 200,
            msg: "创建账号成功"
          });
        }
      });
    }
  });
});

router.get("/delete", function(req, res) {
  Food.findByIdAndRemove(req.query.id, (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "异常"
      });
    } else {
      res.json({
        code: 200,
        msg: "删除成功"
      });
    }
  });
  // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

router.get("/get", function(req, res) {
  Food.findById(req.query.id, function(err, result) {
      console.log(req.query.id)
    if (err) {
        res.json({
          code: 500,
          msg: "异常"
        });
      } else {
        res.json({
          code: 200,
          data: result
        });
      }
  });
});

module.exports = router;
