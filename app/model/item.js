var mongoose  = require('mongoose')
var BaseModel = require('./base')

var ItemSchema = new mongoose.Schema({

    user_id     : ObjectId,
    title       : String,
    description : String,
    state       : Number,
    facility    : {
      type : mongoose.Schema.ObjectId,
      ref  : 'Facility'
    },
    images      : [{
      // https://gist.github.com/aheckmann/2408370
      data        : Buffer,
      contentType : String
    }],
    quote_id: String
})

var Item = BaseModel('Item', ItemSchema)

module.exports = Item;
