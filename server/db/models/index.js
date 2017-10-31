
const User = require('./user')
const Product = require ('./product')
const Address = require('./address');
const Order = require('./order');
const OrderItem = require('./orderitem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasMany(Address);
 Address.belongsTo(User);

 Order.belongsTo(User);
 Order.belongsTo(Address);
 User.hasMany(Order);

 OrderItem.belongsTo(Order)
 Order.hasMany(OrderItem)

 Product.hasOne(OrderItem)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Address,
  Order,
  OrderItem
}
