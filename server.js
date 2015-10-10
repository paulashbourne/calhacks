var express   = require('express');
var mongoose  = require('mongoose');

var constants = require('./app/constants');

var app = express();
app.constants = constants;
mongoose.connect('mongodb://paulashbourne.com/calhacks');

require('./app/routes.js')(app);

var PORT = 8002;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
