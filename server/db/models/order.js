const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('open', 'completed', 'confirmed', 'shipped'),
        defaultValue: 'open'
    }
})

module.exports = Order;