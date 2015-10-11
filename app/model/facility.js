var mongoose  = require('mongoose');
var BaseModel = require('./base');

var FacilitySchema = new mongoose.Schema({
    description : {
      type : String
    },
    address : {
      type : String
    },
    code : {
      type : String
    }
});

var Facility = BaseModel('Facility', FacilitySchema);

module.exports = Facility;
