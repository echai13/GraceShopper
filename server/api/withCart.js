const db = require('../db')
const Order = db.model('order')
const User = db.model('user');

const withCart = function (req, res, next) {
  //// For testing ////
  if (withCart._test_cart) {
    req.cart = withCart._test_cart
    return next()
  }
  if (withCart._test_session_cartId) {
    req.session.cartId = withCart._test_session_cartId
  }
  if (withCart._test_user) {
    req.user = withCart._test_user
  }
  ////////////////////

  if (req.cart) { return next() }

  if (req.session.cartId) {
    const { cartId } = req.session;
    return Order.findById(cartId)
      .then(order => {
        req.cart = order;
        next();
      })
      .catch(next);
  }

  if (req.user) {
    console.log("do you knowww who you arreeeeeee" , req.user.firstName)
    return Order.findOrCreate({where: {userId: req.user.id, status: 'open'}})
      .then(([order, _]) => {
        console.log("what is da order: " , order);
        req.cart = order;
        next();
      })
      .catch(next);
  }

  return Order.create({status: 'open'})
    .then(order => {
      req.cart = order;
      next();
    })
    .catch(next);
}

withCart.clearTestpoints = () => {
  delete withCart._test_cart
  delete withCart._test_session_cartId
}

module.exports = withCart;
