const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/order', require('./order'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/addresses', require('./addresses'));
router.use('/checkout', require('./checkout'))

// router.use((req, res, next) => {
  // console.log('its actually here', req.path, req.originalUrl)
  // const error = new Error('Not Found')
  // error.status = 404
  // next(error)
// })
