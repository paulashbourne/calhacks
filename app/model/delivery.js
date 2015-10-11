var mongoose  = require('mongoose');
var BaseModel = require('./base');

var DeliverySchema = new mongoose.Schema({
    postmates_id : {
      type     : String,
      required : true
    },
    state : {
      type     : String,
      required : true
    },
    pickup_eta : {
      type     : Date,
      required : true
    },
    dropoff_eta : {
      type     : Date,
      required : true
    },
    complete : {
      type     : Boolean,
      required : true
    },
    courier : {
      name : String,
      rating : Number,
      vehicle_type : String,
      phone_number : String,
      location : {
          lat : Number,
          lng : Number
      },
      img_href: String
    },
    items : [{
      type : mongoose.Schema.ObjectId,
      ref  : 'Item'
    }]
});

var Delivery = BaseModel('Delivery', DeliverySchema);

module.exports = Delivery;
