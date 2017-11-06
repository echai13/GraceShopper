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
  console.log('inside of withCart and session and id is...', req.cart, req.session , req.session.cartId);

  if (req.session.cartId) {
    //const { cartId } = req.session;
    const cartId = req.session.cartId
    return Order.findById(cartId)
      .then(order => {
        req.cart = order;
        return next();
      })
      .catch(next);
  }

  if (req.user) {
    console.log("hallow moto i should be a user: " , req.user)
    return Order.findOrCreate({where: {userId: req.user.id, status: 'open'}})
      .then(([order, _]) => {
        req.cart = order;
        req.session.cartId = order.id;
        return next();
      })
      .catch(next);
  }

  return Order.create({status: 'open'})
    .then(order => {
      console.log("im a little order short and stout: ", order)
      req.cart = order;
      req.session.cartId = order.id;
      return next();
    })
    .catch(next);
}

withCart.clearTestpoints = () => {
  delete withCart._test_cart
  delete withCart._test_session_cartId
}

module.exports = withCart;
