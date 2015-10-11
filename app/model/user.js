var mongoose  = require('mongoose')
var BaseModel = require('./base')

var crypto    = require('crypto')

var UserSchema = new mongoose.Schema({
  socket_id : {
    type     : String,
    required : false
  },
  first_name : {
    type     : String,
    required : true
  },
  last_name : {
    type     : String,
    required : true
  },
  street_address : {
    type     : String,
    required : true
  },
  city : {
    type     : String,
    required : true
  },
  state : {
    type     : String,
    required : true
  },
  phone : {
    type     : String,
    required : true
  }
});

var User = BaseModel('User', UserSchema);
User.salt = "90f75148f6c981d0";
User.encrypt_password = function(password) {
  var pwd = password + User.salt;
  return crypto.createHash('sha256').update(pwd).digest('base64');
};

module.exports = User;
