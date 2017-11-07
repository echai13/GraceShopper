const router = require('express').Router()
const { Order, Address } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  return Order.findAll({ include: [{ model: Address }] }) // include all: true, nested: true to get product data
    .then(orders => {
      res.json(orders)
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  const status = req.body.status;
  console.log('inside of update status router with status: ', status);
  Order.findById(req.params.id)
    .then(order => {
      order.update({ status: status })
        .then(order => res.json(order))
        .catch(next);
    })
    .catch(next);

})

// router.get('/single', (req, res, next) => {

// })
