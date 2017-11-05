const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderitem');
const Product = require('./product');


const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('open', 'completed', 'pending', 'confirmed', 'shipped'),
        defaultValue: 'open'
    },
    total: {
      type: Sequelize.VIRTUAL,
      get: function() {
        return (this.orderitems.map(item => item.subtotal)).reduce((a, b) => a + b)
      }
    }
}, {
    defaultScope: {
      include: [
        { model: OrderItem, include: [{model: Product}]} ]
    }
})
// {
//   getterMethods: {
//     total: function() {
//       return this.orderitems.map(item => item.subtotal).reduce((a, b) => a + b)
//     }
//   }
// }

Order.prototype.findOrderTotal = function () {
  return this.getOrderitems()
    .then(items => {
      console.log(items)
      const subtotals = items.map(item => item.subtotal);
      const total = subtotals.reduce((a, b) => a + b)
      console.log(total)
      return total;
    })
}

module.exports = Order;
