const {ENUM, STRING, DECIMAL, INTEGER, ARRAY, TEXT, BOOLEAN, VIRTUAL} = require('sequelize')
const db = require('../db')
const Category = require('./category')
const Review = require('./review')

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
			return this.stock !== 0
		}
  }
}, {
    defaultScope: {
      include: [
        { model: Category }, { model: Review } ]
    }
})

module.exports = Product
