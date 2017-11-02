const { Order } = require('../db/models')

const withCart = function (req, res, next) {
  if (req.cart) { next() }


  else if (req.session.cartId) { // true (for testing)
    // find by id 2
    Order.findOrCreate({ where: { id: req.session.cartId, status: open } })
      .then(([order, _]) => {
        req.cart = order;
        next();
      })
  }

  else if (req.user) {
    Order.findOrCreate({where: {userId: req.user.id, status: open}})
      .then(([order, _]) => {
        req.cart = order;
        next();
      })
  }

  else {
    Order.create({status: 'open'})
      .then(order => {
        req.cart = order;
        next();
      })
  }
}

export default withCart;
