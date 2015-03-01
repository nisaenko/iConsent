var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    nickname: String,
    username: String,
    name:  String,
    password: String,
    role: Number,
    email: String,
    status: Number,
    birthdate: Date
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);