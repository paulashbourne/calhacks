var mongoose = require('mongoose')
var Schema = mongoose.Schema
var FacilitySchema = require('mongoose').model('Facility').schema

var ItemSchema = new Schema({
    user_id     : String
    title       : String,
    description : String,
    state       : int,
    photos      : [String],
    facility    : FacilitySchema
})

module.exports = mongoose.model('Item', ItemSchema)
