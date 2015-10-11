var Postmates = require('postmates')
var postmates = new Postmates('cus_KWXEdIan-1REM-', '311be434-16a6-408c-8f15-02c5b65d0e7b')
var User = require('./model/user')
var Item = require('./model/item')
var Facility = require('./model/facility')
var async = require('async')

exports.pickup = function(user, item, facility, next) {
  var delivery = {
    manifest: item.title,
    pickup_name: user.first_name + "'s House",
    pickup_address: user.street_address + ', ' + user.city + ', ' + user.state,
    pickup_phone_number: user.phone,
    dropoff_name: facility.name,
    dropoff_address: facility.address,
    dropoff_phone_number: "4155796833",
    dropoff_notes: exports.generate_notes(facility.name),
    quote_id: item.quote_id
  }
  console.log(delivery)
  postmates.new(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.dropoff = function(user, item, facility, next) {
  var delivery = {
    manifest: item.title,
    dropoff_name: user.first_name + "'s House",
    dropoff_address: user.street_address + ', ' + user.city + ', ' + user.state,
    dropoff_phone_number: user.phone,
    pickup_name: facility.name,
    pickup_address: facility.address,
    pickup_phone_number: "4155796833",
    dropoff_notes: exports.generate_notes(user, item),
    quote_id: item.quote_id
  }
  postmates.new(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.generate_pickup_quote = function(user, item, facility, next) {
  var delivery = {
    pickup_address: user.street_address + ', ' + user.city + ', ' + user.state,
    dropoff_address: facility.address
  }

  postmates.quote(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}

exports.generate_dropoff_quote = function(user, item, facility, next) {
  var delivery = {
    dropoff_address: user.street_address + ', ' + user.city + ', ' + user.state,
    pickup_address: facility.address
  }

  postmates.quote(delivery, function(err, res) {
    next(err, JSON.parse(res.text))
  })
}


exports.generate_notes = function(facility) {
  return "The facility is called " + facility
}
