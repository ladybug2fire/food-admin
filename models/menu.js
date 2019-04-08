/**
 * 菜单/收藏夹
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var MenuSchema = new Schema({
    userId: String,
    Menuname: { type: String },
    picUrl: { type: String },
    seats: { type: String },
    star: {type: Number },
    addTime: {type: String},
    isPublic: {type: Boolean},
    desc: {type: String},
});

module.exports = mongoose.model('Menu',MenuSchema);