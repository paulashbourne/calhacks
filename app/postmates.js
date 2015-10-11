var Postmates = require('postmates')
var postmates = new Postmates('cus_KVBJk15W29az5-', 'cd58846d-65ed-453f-86e7-84501be458d5')
var User = require('./model/user')
var Item = require('./model/item')
var Facility = require('./model/facility')
var async = require('async')

exports.pickup = function(user, item, facility, next) {
  var delivery = {
    manifest: item.title,
    pickup_name: user.name.first + "'s House",
    pickup_address: user.address.street + ', ' + user.address.city + ', ' + user.address.state,
    pickup_phone_number: user.phone,
    dropoff_name: facility.name,
    dropoff_address: facility.address,
    dropoff_phone_number: "4155796833",
    dropoff_notes: exports.generate_notes(user, item),
    quote_id: item.quote_id
  }
  postmates.new(delivery, next)
}

exports.generate_quote = function(user, item, facility, next) {
  async.auto({
    getItem: function(callback) {
      Item.findById(item_id, callback)
    },
    getFacility: ['getItem', function(callback, results) {
      Facility.findById(results.getItem.facility_id.toString())
    }],
    getUser: ['getItem', function(callback, results) {
      User.findById(results.getItem.user_id, callback)
    }],
    getQuote: ['getUser', 'getFacility', function(callback, results) {
      var user = results.getUser
      var item = results.getItem
      var facility = results.getFacility
      var delivery = {
        pickup_address: user.address.street + ', ' + user.address.city + ', ' + user.address.state,
        dropoff_address: facility.address
      }

      postmates.quote(delivery, callback)
    }]
  }, function(err, res) {
      next(err, res)
  })
}


exports.generate_notes = function(facility) {
  return "The facility is called " + facility
}
