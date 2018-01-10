import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartThunk, changeQuantityThunk, deleteFromCartThunk} from '../store'
import CartRow from './CartRow';


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
    const subtotal = cart.total;
    const tax = (cart.total * 0.09).toFixed(2);
    const shipping = 10;

    return (
      <div className="row cart">
        <div className="col-md-12 col-sm-12 col-xs-12 table">
          { cart && orderItems && orderItems.length > 0 ?
            <table className="table table-shopping">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {cart && orderItems && orderItems.map((element) => (
                <CartRow
                  key={element.id}
                  element={element}
                  handleQuantity={this.props.handleQuantity}
                  handleDelete = {this.props.handleDelete} />
              ))}
                <tr>
                  <td colSpan="2" className="text-right"><strong>Order Summary</strong></td>
                  <td className="td-total">
                    Subtotal
                  </td>
                  <td className="td-currentPrice">
                      <small>$</small>{subtotal && subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="td-total">
                    Tax
                  </td>
                  <td className="td-currentPrice">
                      <small>$</small>{tax}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="td-total">
                    Shipping
                  </td>
                  <td className="td-currentPrice">
                      <small>$</small>{shipping.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="td-total">
                    Total
                  </td>
                  <td className="td-currentPrice">
                      <small>$</small>{(Number(subtotal) + Number(tax) + Number(shipping)).toFixed(2)}
                  </td>
                  <td colSpan="1" className="text-right">
                    <Link to="/checkout">
                      <button type="button" className="btn btn-info btn-round">
                        <i className ="material-icons" >Complete Purchase</i>
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          :
            <div className="empty-cart d-flex align-items-center justify-content-center">
              <span>
                <h4 className="d-flex justify-content-center"> Adopt a robot pet today ♥ </h4>
                <p className="d-flex justify-content-center">Nothing in cart yet ...</p>
                <div className="d-flex justify-content-center shop-now">
                  <button type="button" className="btn btn-secondary shop-now">
                    <Link to="/products">SHOP NOW</Link>
                  </button>
                </div>
              </span>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapPropToCart = (state) => {
  console.log(state.cart)
  return {
	cart: state.cart
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
    },
    handleDelete(orderItemId){
      dispatch(deleteFromCartThunk(orderItemId))
    }
  }
}


export default connect(mapPropToCart, mapDispatch)(Cart)
