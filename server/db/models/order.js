const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderitem');
const Product = require('./product');


const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('open', 'completed', 'pending', 'confirmed', 'shipped'),
        defaultValue: 'open'
    }
}, {
    defaultScope: {
      include: [
        { model: OrderItem, include: [{model: Product}]} ]
    }
  }, {
    getterMethods: {
      subtotal() {
        let subtotal;
        return this.orderitems.map(item => {
          subtotal += item.subtotal
        })
      }
    }
  }
)

Order.prototype.findOrderTotal = async function () {
  const items = await this.getOrderitems();
  const subtotals = items.map(item => item.subtotal);
  const total = subtotals.reduce((a, b) => a + b)
  return total;
}

module.exports = Order;
