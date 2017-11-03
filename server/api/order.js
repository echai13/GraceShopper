const router = require('express').Router()
const withCart = require('./withCart');
const { OrderItem, Order } = require('../db/models')

module.exports = router

router.use(withCart);

router.get('/', (req, res, next) => {

    res.json(req.cart)
});

router.put('/', async (req, res, next) => {
  console.log('inside of router PUT /api/order with req.cart: ', req.cart, ' and req.body: ', req.body);
  const { currentPrice, quantity, productId } = req.body.productInfo;

	const orderItem = await OrderItem.findOne( {
  	where: {productId: productId , orderId: req.cart.id} })
  	if (orderItem) {
  		const newQuantity = await orderItem.update({ quantity: quantity})
  		req.cart = await Order.findById(req.cart.id)
 		res.json(req.cart);
  	} else {
  		OrderItem.create({currentPrice, quantity, productId, orderId: req.cart.id })
		    .then( async () => {
		      req.cart = await Order.findById(req.cart.id)
		      res.json(req.cart);
		    })
		    .catch(next);
  	}
})




//?take the else statement in the put request and turn it into a post request?
