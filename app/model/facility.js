var mongoose  = require('mongoose');
var BaseModel = require('./base');

var FacilitySchema = new mongoose.Schema({
    name : {
      type : String
    },
    address : {
      type : String,
      required: true
    },
    code : {
      type : String,
      required: true
    }
});

var Facility = BaseModel('Facility', FacilitySchema);

module.exports = Facility;
