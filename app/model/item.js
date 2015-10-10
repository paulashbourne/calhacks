var mongoose = require('mongoose')
var Schema = mongoose.Schema
var FacilitySchema = require('mongoose').model('Facility').schema

var ItemSchema = new Schema({
    user_id     : String
    title       : String,
    description : String,
    state       : int,
    facility    : FacilitySchema
    images      : [{
      // https://gist.github.com/aheckmann/2408370
      data        : Buffer,
      contentType : String
    }]
})

module.exports = mongoose.model('Item', ItemSchema)
