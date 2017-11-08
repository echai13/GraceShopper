const router = require('express').Router()
const stripeKey = require('../../secrets')
var stripe = require('stripe')(stripeKey)
module.exports = router

router.post('/', (req, res, next) => {
  console.log('entered checkout api')
  console.log (stripeKey);
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
      console.log('EMAAAAAAIIILL', req.body.email)
      return stripe.charges.create({
        amount: Math.round(req.body.amount * 100),
        currency: 'usd',
        source: token.id,
        description: 'new order for ferrets',
        receipt_email: req.body.email
      })
        .then(charge => {
          console.log(charge)
          res.status(200).redirect('/')
        })
    })
})
