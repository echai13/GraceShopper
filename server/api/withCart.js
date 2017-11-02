const { Order } = require('../db/models')

const withCart = function (req, res, next) {
  if (req.cart) { next() }

  if (req.session.cartId) { // true (for testing)
    const { cartId } = req.session;
    Order.findById(cartId)
      .then(order => {
        req.cart = order;
        next();
      })
      .catch(next);
  }

  else if (req.user) {
    Order.findOrCreate({where: {userId: req.user.id, status: open}})
      .then(([order, _]) => {
        req.cart = order;
        next();
      })
      .catch(next);
  }

  else {
    Order.create({status: 'open'})
      .then(order => {
        req.cart = order;
        next();
      })
      .catch(next);
  }
}

module.exports = withCart;
