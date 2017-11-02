const router = require('express').Router()
const withCart = require('./withCart');
module.exports = router


router.use(withCart);

router.get('/', (req, res, next) => {
  if (req.cart) { res.send(req.cart) }
  else { // the user should never get here but JIC
    res.setStatus(404);
    next();
  }
});

