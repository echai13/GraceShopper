const { STRING } = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: STRING,
    allowNull: false,
    isUnique: true
}
})

module.exports = Category
