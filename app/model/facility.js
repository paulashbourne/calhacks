var mongoose  = require('mongoose')
var BaseModel = require('./app/model/base')

var FacilitySchema = new mongoose.Schema({
    description : String
})

module.exports = BaseModel('Facility', FacilitySchema)
