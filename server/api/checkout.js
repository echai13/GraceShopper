const router = require('express').Router()
var stripe = require('stripe')('sk_test_J6jbAmLgjo0q6jt1vfO4cYuz')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('entered checkout api')
  return stripe.tokens.create({
    card: {
      'number': req.body.cardDetails.cardNumber,
      'exp_month': req.body.cardDetails.expMonth,
      'exp_year': req.body.cardDetails.expYear,
      'cvc': req.body.cardDetails.cvc
    }
  })
    .then(token => {
      console.log(token)
      return stripe.charges.create({
        amount: req.body.amount,
        currency: 'usd',
        source: token.id,
        description: 'new order for ferrets'
      })
        .then(charge => {
          console.log(charge)
          res.status(200).redirect('/')
        })
    })
})
