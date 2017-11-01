const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderitem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    currentPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    subtotal: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.currentPrice * this.quantity;
        }
    }
})

module.exports = OrderItem;