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

module.exports = Order;
