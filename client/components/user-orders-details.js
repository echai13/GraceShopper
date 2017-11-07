import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getOrdersThunk } from '../store'

/**
 * COMPONENT
 */
export class UserOrderDetails extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.id);
  }

  render() {
    const order = this.props.orders.filter(order => order.id === Number(this.props.match.params.orderId))[0];
      console.log('THE ORDER', order)
      console.log('THE PROPS', this.props)

    return (
        <div>
            <h3>Order Details</h3>
            <p><strong>Date Ordered:</strong> {order && order.createdAt.slice(0, 10)}</p>
            <p><strong>Status:</strong> {order && order.status}</p>
            <p><strong>Shipped To:</strong>
            <br />{order && order.address.street1}
            {order && order.address.street2 && <span><br />{order.address.street2}</span>}
            <br />{order && order.address.city + ', ' + order.address.state + ' ' + order.address.zipcode}
            <br />{order && order.address.country}
            </p>
            {
                order && order.orderitems.map((orderitem, i) => {
                  return orderitem && [<p key={i + 'name'}><strong>{orderitem.product.name}</strong></p>,
                  <img key={i + 'image'} src={orderitem.product.image} />,
                  <ul key={i}>
                  <li><strong>Price:</strong> <small>$</small>{orderitem.product.price}</li>
                  <li><strong>Quantity:</strong> {orderitem.quantity}</li>
                  <li><strong>Subtotal:</strong> <small>$</small>{orderitem.subtotal.toFixed(2)}</li>
                  </ul>]
                })
            }
            <h4>Order Summary</h4>
            <p><strong>Subtotal:</strong> <small>$</small>{order && order.total}
            <br /><strong>Tax:</strong> <small>$</small>{order && (order.total * .09).toFixed(2)}
            <br /><strong>Shipping:</strong> <small>$</small>10
            <br /><strong>Grand Total:</strong> <small>$</small>{order && (Number(order.total) + Number(order.total*.09) + 10).toFixed(2)}
            </p>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('STATE', state)
  return {
    id: state.user.id,
    orders: state.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrders (id) {
      dispatch(getOrdersThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserOrderDetails)