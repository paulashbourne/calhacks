var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://paulashbourne.com/calhacks');

require('./app/routes.js')(app);

app.listen(8002, function () {
  console.log('Hacks is running, yo');
});
