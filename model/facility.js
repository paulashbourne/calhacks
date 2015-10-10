var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FacilitySchema = new Schema({
    description : String
})

module.exports = mongoose.model('Facility', FacilitySchema)
