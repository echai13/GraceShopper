const {ENUM, STRING, DECIMAL, INTEGER, ARRAY, TEXT} = require('sequelize')
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
		defaultValue: 0
	},
	category: {
		type: ENUM("plant-type", "miscellaneous"),
		defaultValue: "miscellaneous"
	},
	reviews: {
		type: ARRAY(TEXT),
		allowNull: true
	}
})

module.exports = Product