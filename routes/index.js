

exports.index = function (req, res) {
    res.redirect('/admin/')
}

exports.signup = function(req, res){
    res.render("signup", {title: '注册', layout: 'base' });
}

exports.login = function(req, res){
    res.render("login", {title: '登入' });
}

exports.order = function(req, res){
    res.render("order", {title: '选座' });
}