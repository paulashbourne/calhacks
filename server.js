// Libraries
var express   = require('express');
var mongoose  = require('mongoose');
var http      = require('http');

// Local imports
var constants = require('./app/constants');

// Initialize app
var app = express();
var server = http.Server(app);
var io     = require('socket.io')(server);

app.constants = constants;

// Conntext to mongo
mongoose.connect('mongodb://paulashbourne.com/calhacks');
app.use(express.static('app/public'));

// Set up routes
require('./app/routes/router')(app, io);

// Set up http server
var port = process.env.port || 8002;
server.listen(port, function () {
  console.log('Server is running on port ' + port);
});

// Socket
var User = require('./app/model/user')
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('user_id', function(user_id) {
    User.findById(user_id, function(err, user) {
      user.socket_id = socket.id;
      user.save();
    });
  });
});
