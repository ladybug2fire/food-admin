exports.index = function(req, res){
    res.render("admin/index", {title: '后台管理系统', layout: 'admin/layout' });
}