var mongoose = require('mongoose')
var Schema = mongoose.Schema

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
    phone: String
})

module.exports = mongoose.model('User', UserSchema)
