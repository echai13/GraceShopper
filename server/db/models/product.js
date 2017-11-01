const {ENUM, STRING, DECIMAL, INTEGER, ARRAY, TEXT, BOOLEAN, VIRTUAL} = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
	name: {
		type: STRING,
		allowNull: false
	},
	image: {
		type: STRING,
		defaultValue: 'http://q985online.com/files/2015/04/Pet-Rock-11-300x200.jpg'
	},
	price: {
		type: DECIMAL(12,2),
		allowNull: false
	},
	description: {
		type: TEXT,
		allowNull: false,
	},
	stock: {
		type: INTEGER,
		defaultValue: 10
  },
  isAvailable: {
    type: VIRTUAL,
    get() {
			if (this.stock === 0) return false
			else return true
		}
  }
})

module.exports = Product
