/**
 * 菜单/收藏夹
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var FoodSchema = new Schema({
    foodname: { type: String },
    tags: [{label: {type: String}, id: {type: String}}],
    picUrl: { type: String },
    diffculty: String,
    addTime: String,
    cookTime: String,
    prepareTime: String,
    price: Number,
    steps: [{title: String, picUrl: String}],
    mertial: [{title: String, amount: String}]
});
    
var MenuSchema = new Schema({
    userid: String,
    username: String,
    menuname: { type: String },
    foods: [ FoodSchema ],
    addTime: {type: String},
    ispublic: {type: Boolean},
    desc: {type: String},
});

module.exports = mongoose.model('Menu',MenuSchema);