exports.index = function(req, res){
    if(req.session.admin){
        res.render("admin/order", {title: '后台管理系统', layout: 'admin/layout' });
    }else{
        res.redirect('/admin/login');
    }
}