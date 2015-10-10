var mongoose  = require('mongoose')
var BaseModel = require('./base')

var UserSchema = new mongoose.Schema({
  name: {
    first : String,
    last  : String
  },
  address: {
    street : String,
    city   : String,
    state  : String,
    zip  : String
  },
  phone: String,
  items: [{
    type : mongoose.Schema.ObjectId,
    ref  : 'Item'
  }]
});

var User = BaseModel('User', UserSchema);

module.exports = User;
