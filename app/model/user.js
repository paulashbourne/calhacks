var mongoose  = require('mongoose')
var BaseModel = require('./app/model/base')

var ItemSchema = mongoose.model('Item').schema

var UserSchema = new mongoose.Schema({
    name: {
        first : String,
        last  : String
    },
    address: {
        street : String,
        city   : String,
        state  : String,
        zip    : String
    },
    phone: String,
    items: [ItemSchema]
});

var User = BaseModel('User', UserSchema);

module.exports = User
