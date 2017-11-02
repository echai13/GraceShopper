const db = require('../db')
const Order = db.model('order')
const User = db.model('user');

const withCart = async function (req, res, next) {
  const testCart = await Order.findById(1);
  //const testUser = await Order.findById(1);

  req.cart = testCart;
  //req.user = testUser;
  // console.log('testCart is: ', testCart);
  //console.log('req.cart is: ', req.cart);

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
    Order.findOrCreate({where: {userId: req.user.id, status: 'open'}})
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
