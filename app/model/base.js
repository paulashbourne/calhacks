var mongoose = require('mongoose');

var model = function(name, schema) {
  var mongooseModel = mongoose.model(name, schema);
  return mongooseModel;
};

module.exports = model;
