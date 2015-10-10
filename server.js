var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://paulashbourne.com/calhacks');

require('./app/routes.js')(app);

var PORT = 8002;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
