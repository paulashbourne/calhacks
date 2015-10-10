var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = require('mongoose').model('Item').schema

var UserSchema = new Schema({
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
})

module.exports = mongoose.model('User', UserSchema)
