var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ItemSchema = new Schema({
    user_id     : String
    title       : String,
    description : String,
    state       : int,
})

module.exports = mongoose.model('Item', ItemSchema)
