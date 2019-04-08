var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    sex: { type: String },
    birthday: { type: String },
    address: { type: String },
    desc: { type: String },
    menus: [{id:String}]
});

module.exports = mongoose.model('User',UserSchema);