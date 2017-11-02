const router = require('express').Router()
const { User } = require('../db/models')
const { Order } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// to get each user's orders
router.get('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  
  if (req.user) {
    if (userId === req.user.id || req.user.isAdmin) {
      Order.findAll({
        where: {userId},
        include: [{all: true}]
      })
        .then(orders => res.json(orders))
        .catch(next)
    }
  } else {
    res.json('not authorized')
  }
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

