const router = require('express').Router()
const withCart = require('./withCart');
module.exports = router

//console.log('withCart is: ', withCart);

router.use(withCart);

router.get('/', (req, res, next) => {
  if (req.cart) {
    //console.log('inside of router: ', req.cart);
    res.send(req.cart) }
  else { // the user should never get here but JIC
    res.status(404);
    next();
  }
});

