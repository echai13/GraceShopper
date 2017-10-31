const router = require('express').Router()
const {Product} = require('../db/product')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
