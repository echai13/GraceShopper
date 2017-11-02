import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getCart, addToCart, removeFromCart, deleteFromCart} from '../store'

const Cart = (props) => {
  // const products = props.products
  const cart = [
  	{ id: 1, productId: 2, orderId: 1 ,quantity: 2, currentcurrentPrice: 3.33 , category: 'domestic', image: 'http://wallpaper.sc/id/ipad/wp-content/uploads/2016/10/ipad-2048x2048-thumbnail_00158-256x256.jpg'},
   	{ id: 2, productId: 1, quantity: 2, currentcurrentPrice: 58.65 , category: 'domestic', image: 'http://wallpaper.sc/id/ipad/wp-content/uploads/2016/10/ipad-2048x2048-thumbnail_00158-256x256.jpg'}
  ]

  return (
    	  <div className="container">
		                        <table className="table table-shopping">
		                            <thead>
		                                <tr>
		                                    <th >Product</th>
		                                    <th className="text-right">Category</th>
		                                    <th className="text-right">currentPrice</th>
		                                    <th className="text-right">Qty</th>
		                                    <th className="text-right">Subtotal</th>
		                                    <th></th>
		                                </tr>
		                            </thead>
		                            <tbody>
                                  	{cart.length && cart.map((element, index) => (
		                                <tr key={element.id}>
		                                    <td>
		                                        <div className="img-container">
								  					<Link to={`/products/${element.id}`}>
		                                            	<img src={element.image} alt="..." />
													</Link>
		                                        </div>
		                                    </td>
		                                    <td className="td-name">
								  					<Link to={`/products/${element.id}`}>
		                                        		{element.name}
													</Link>
		                                        <br /><small>from {element.category}</small>
		                                    </td>
		                                    <td className="td-number">
		                                        <small>&#36;</small>{element.currentPrice}
		                                    </td>
		                                    <td className="td-number">
		                                        {element.quantity}
		                                        <div className="btn-group">
		                                            <button className="btn btn-round btn-info btn-xs" onClick={() => props.handleMinus(element)}> <i className="material-icons">remove</i> </button>
		                                            <button className="btn btn-round btn-info btn-xs" onClick={() => props.handlePlus(element)}> <i className="material-icons">add</i> </button>
		                                        </div>
		                                    </td>
		                                    <td className="td-number">
		                                        <small>&#36;</small>{element.currentPrice * element.quantity}
		                                    </td>
		                                    <td className="td-actions">
		                                        <button type="button" rel="tooltip" data-placement="left" title="Remove item" className="btn btn-simple" onClick={() => props.handleDelete(element.id)}>
		                                            <i className="material-icons">close</i>
		                                        </button>
		                                    </td>
		                                </tr>
                                  ))}
		                                <tr>
		                                    <td colSpan="2">
		                                    </td>
		                                    <td className="td-total">
		                                       Total
		                                    </td>
		                                    <td className="td-currentPrice">
		                                        <small>$</small>{cart.map(el => el.currentPrice * el.quantity).reduce((a,b) => a + b, 0)}
		                                    </td>
		                                    <td colSpan="1" className="text-right"> 
												<Link to='/checkout'>
													<button type="button" className="btn btn-info btn-round">
														Complete Purchase <i className="material-icons">keyboard_arrow_right</i>
													</button>
												</Link>
											</td>

		                                </tr>
		                            </tbody>
		                        </table>    
		</div>

)}

const mapPropToCart = (state) => {
  return {
	cart: state.cart,

  }
}

const mapDispatch = (dispatch) => {
  return {
	handleDelete(elementId){
		dispatch(deleteFromCart(elementId))
	},
	handlePlus(product){
		dispatch(addToCart(product))
	},
	handleMinus(product){
		dispatch(removeFromCart(product))
	},
  }
}

export default connect(mapPropToCart, mapDispatch)(Cart)