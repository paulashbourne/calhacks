var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.json({message: "Hello Paul"})
})

app.listen(8002, function () {
  console.log('Hacks is running, yo');
});
