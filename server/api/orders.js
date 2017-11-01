const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get(`/`, (req, res, next) => {
  Order.findAll() // include all: true, nested: true to get product data
    .then(orders => res.json(orders))
    .catch(next)
})
