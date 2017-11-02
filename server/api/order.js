const router = require('express').Router()
const withCart = require('./withCart');
const { OrderItem } = require('../db/models')

module.exports = router

router.use(withCart);

router.get('/', (req, res, next) => {
    res.json(req.cart)
});

router.put('/', (req, res, next) => {
  const { currentPrice, quantity, productId } = req.body;
  OrderItem.create({currentPrice, quantity, productId, orderId: req.cart.id })
    .then(() => {
      res.json(req.cart)
    })
    .catch(next);
})

