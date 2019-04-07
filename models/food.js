/**
 * 菜谱
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
    steps: [{title: String, picUrl: String}]
});

module.exports = mongoose.model('Food',FoodSchema);