const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => {
    res.json(order)
  })
  .catch(err => next(err))
})

router.get('/', (req, res, next) => {
  return Order.findAll() // include all: true, nested: true to get product data
    .then(orders => {
      res.json(orders)
    })
    .catch(err => next(err))
})

// router.get('/single', (req, res, next) => {

// })
