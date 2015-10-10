var Item = require('../model/item')

exports.getItemFromUser = function(user_id, next) {
  if (!user_id)
    return next("User ID is required to find Item")

  Item.find({user_id: user_id}).exec(next)
}
