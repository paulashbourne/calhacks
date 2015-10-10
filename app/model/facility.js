var mongoose  = require('mongoose')
var BaseModel = require('./base')

var FacilitySchema = new mongoose.Schema({
    description : String
})

module.exports = BaseModel('Facility', FacilitySchema)
