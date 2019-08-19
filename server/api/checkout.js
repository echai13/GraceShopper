const router = require('express').Router();

const stripeKey = require('../../secrets').STRIPE_API_KEY;
var stripe = require('stripe')(stripeKey);

const { Order } = require('../db/models');

module.exports = router;

router.post('/', (req, res, next) => {
  delete req.session.cartId;
  req.session.save();
  delete req.cart;

  const { cardDetails, amount, email } = req.body || {};
  const {
    cardNumber: number,
    expMonth: exp_month,
    expYear: exp_year,
    cvc
  } = cardDetails || {};

  const card = { number, exp_month, exp_year, cvc };
  
  return stripe.tokens
    .create({ card })
    .then(({ id }) => { // token: { id }
      const order = {
        amount: Math.round(amount * 100),
        currency: 'usd',
        source: id,
        description: 'new order for ferrets',
        receipt_email: email,
      };

      return stripe.charges
        .create(order)
        .then(charge => {
          if (!charge.failure_code) {
            return Order.findByPk(req.body.orderId)
              .then(order => order.update({ status: 'confirmed' }))
              .then(() => res.status(200).redirect('/'))
              .catch(next);
          }
        })
        .catch(next);
    })
    .catch(next);
});
