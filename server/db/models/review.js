const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    stars: {
        type: Sequelize.ENUM('one', 'two', 'three', 'four', 'five'),
        allowNull: false
    }
})

module.exports = Review;