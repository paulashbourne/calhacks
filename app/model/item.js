var mongoose  = require('mongoose')
var BaseModel = require('./app/model/base')
var FacilitySchema = require('mongoose').model('Facility').schema

var ItemSchema = new mongoose.Schema({
    user_id     : ObjectId,
    title       : String,
    description : String,
    state       : int,
    facility_id : ObjectId,
    images      : [{
      // https://gist.github.com/aheckmann/2408370
      data        : Buffer,
      contentType : String
    }],
    quote_id: String
})

module.exports = mongoose.model('Item', ItemSchema)
