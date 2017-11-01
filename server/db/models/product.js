const {ENUM, STRING, DECIMAL, INTEGER, ARRAY, TEXT, BOOLEAN} = require('sequelize')
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
    type: BOOLEAN,
    defaultValue: true
  },
	reviews: {
		type: ARRAY(TEXT),
		allowNull: true
	}
},
{
  hooks: {
    afterUpdate(product, options) {
      if (product.stock === 0){
        product.isAvailable = false;
      }
    },
    beforeCreate(product, options) {
      if (product.stock === 0){
        product.isAvailable = false;
      }
    }
  }
})

module.exports = Product
