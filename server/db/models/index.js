
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Address = require('./address');
const Order = require('./order');
const OrderItem = require('./orderitem')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasMany(Address);
 Address.belongsTo(User);

 User.hasMany(Order);
 Order.belongsTo(User);
 Order.belongsTo(Address);


 Order.hasMany(OrderItem)
 OrderItem.belongsTo(Order)
 OrderItem.belongsTo(Product)

 Product.belongsToMany(Category, { through: 'ProductCategory' });
 // Product now has getCategories, setCategories), addCategory,addCategories and removeCategory
 // ex productInstance.addCategory(categoryInstance)
 Category.belongsToMany(Product, { through: 'ProductCategory' });

 Review.belongsTo(User);
 User.hasMany(Review);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Address,
  Order,
  OrderItem,
  Review
}
