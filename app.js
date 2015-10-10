var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.json({message: "Hello Paul"})
})

app.listen(1337)
