var mongoose = require('mongoose');

var model = function(name, schema) {
  var _model = mongoose.model(name, schema);
  return _model;
};

module.exports = model;
