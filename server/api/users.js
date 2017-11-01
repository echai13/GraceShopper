const router = require('express').Router()
const { User } = require('../db/models')
const { Order } = require('../db/models')
module.exports = router

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

// to get each user's orders
router.get('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  Order.findAll({
    where: { userId }
  })
    .then(orders => res.json(orders))
    .catch(next)
})
