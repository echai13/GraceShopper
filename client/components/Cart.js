import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getCartThunk, changeQuantityThunk, removeFromCart, deleteFromCart} from '../store'


export class Cart extends Component {

  // const products = props.products

  componentDidMount(){
  	this.props.fetchCart();
  }
  /// soooooooo
  /*
   if the quantity for an item is zero, the remove button should switch to say delete and should run a different thunk to actually delete that order item

   if the quantity is at stock, then the add button should be disabled

  */

  render() {
  	const { cart } = this.props;
  	const orderItems = cart.orderitems;

	return (
	  <div className="container">
            <table className="table table-shopping">
                <thead>
                    <tr>
                        <th >Product</th>
                        <th className="text-right">Description</th>
                        <th className="text-right">currentPrice</th>
                        <th className="text-right">Qty</th>
                        <th className="text-right">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
              	{cart && orderItems && orderItems.map((element, index) => (
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
                                <button
                                		className="btn btn-round btn-info btn-xs"
                                		onClick={() => {
                                			const updateQuantity = Object.assign({}, element, {quantity : element.quantity -1} )
                                			this.props.handleQuantity(updateQuantity)}}>
                                		<i className="material-icons">remove</i> </button>
                                <button
                                		className="btn btn-round btn-info btn-xs"
                                		onClick={() => {
                                 			const updateQuantity = Object.assign({}, element, {quantity : element.quantity +1} )
                                			this.props.handleQuantity(updateQuantity)}}>
                                		<i className="material-icons">add</i> </button>
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
                            <small>$</small>{cart && orderItems && orderItems.map(el => el.currentPrice * el.quantity).reduce((a,b) => a + b, 0)}
                        </td>
                        <td colSpan="1" className="text-right">
							<Link to='/checkout'>
								<button type="button" className="btn btn-info btn-round">
									 <i className ="material-icons" >Complete Purchase</i>
								</button>
							</Link>
						</td>

                    </tr>
                </tbody>
            </table>
	</div>

)

  }
  }

const mapPropToCart = (state) => {
  return {
	cart: state.cart,

  }
}

// const mapDispatch = (dispatch) => ( {getCartThunk} )


const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCart() {
      dispatch(getCartThunk())
    },
    handleQuantity(quantity) {
      dispatch(changeQuantityThunk(quantity))
    }
  }
}


export default connect(mapPropToCart, mapDispatch)(Cart)





















