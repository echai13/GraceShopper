const router = require('express').Router()
const withCart = require('./withCart');
const { OrderItem, Order } = require('../db/models')

module.exports = router

router.use(withCart);

router.get('/', (req, res, next) => {

    res.json(req.cart)
});

router.put('/', async (req, res, next) => {
	const { currentPrice, quantity, productId } = req.body.productInfo;


	const orderItem = await OrderItem.findOne( {
  	where: {productId: productId , orderId: req.cart.id} }) 
  	if (orderItem) {
  		const newQuantity = await orderItem.update({ quantity: quantity})
  		console.log("newQuantity is : " , newQuantity);
  		req.cart = await Order.findById(req.cart.id)
 		res.json(req.cart);
  	} else {
  		OrderItem.create({currentPrice, quantity, productId, orderId: req.cart.id })
		    .then( async () => {
		      console.log("i shouldn't show up oops");
		      req.cart = await Order.findById(req.cart.id)
		      res.json(req.cart);
		    })
		    .catch(next);

  	}
})




//take the else statement in the put request and turn it into a post request? 