var mongoose  = require('mongoose')
var BaseModel = require('./base')

var crypto    = require('crypto')

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
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
User.salt = "90f75148f6c981d0";
User.encrypt_password = function(password) {
  var pwd = password + User.salt;
  return crypto.createHash('sha256').update(pwd).digest('base64');
};

module.exports = User;
