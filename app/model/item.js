var mongoose  = require('mongoose')
var BaseModel = require('./base')

var ItemSchema = new mongoose.Schema({
    user_id : {
      type     : mongoose.Schema.ObjectId,
      required : true
    },
    title : {
      type     : String,
      required : true
    },
    description : {
      type     : String,
      required : false,
    },
    state : {
      type     : Number,
      required : true
    },
    facility : {
      type : mongoose.Schema.ObjectId,
      ref  : 'Facility'
    },
    images : [{
      // https://gist.github.com/aheckmann/2408370
      data        : Buffer,
      contentType : String
    }],
    quote_id :{
      type     : String,
      required : false
    }
})

var Item = BaseModel('Item', ItemSchema)

module.exports = Item;
