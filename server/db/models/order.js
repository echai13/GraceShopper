const Sequelize = require('sequelize')
const db = require('../db')
const OrderItem = require('./orderitem');
const Product = require('./product');
const User = require('./user')


const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('open', 'completed', 'pending', 'confirmed', 'shipped'),
        defaultValue: 'open'
    },
    total: {
      type: Sequelize.VIRTUAL,
      get: function() {
          try {
            return this.orderitems.map(item => item.subtotal).reduce((a, b) => a + b);
          }
          catch (err) {
            return 0
          }
        // (this.orderitems && this.orderitems !== [] ?
        //         this.orderitems.map(item => item.subtotal).reduce((a, b) => a + b)
        //         : 0)
      }
    }
}, {
    defaultScope: {
      include: [
        { model: OrderItem, include: [{ model: Product }] }, { model: User, attributes: ['id', 'firstName', 'lastName', 'email']} ]
    }
})

module.exports = Order;
