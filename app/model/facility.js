var mongoose  = require('mongoose');
var BaseModel = require('./base');

var FacilitySchema = new mongoose.Schema({
    description : String
});

var Facility = BaseModel('Facility', FacilitySchema);

module.exports = Facility;
