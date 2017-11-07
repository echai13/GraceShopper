import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getOrdersThunk } from '../store'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserOrders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.id);
  }

  render() {
    return (
      <div className="container">
        <table className="table table-shopping">
            <thead>
              <tr>
                <th>Date Ordered</th>
                <th>Status</th>
                <th>Item List</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
            {
              !this.props.orders.error && this.props.orders.map(order => {
                return order && order.status !== 'open' && [order.orderitems.map((orderitem, i) => {
                  return orderitem && <tr key={i}>
                  <td>{i == 0 ? order.createdAt.slice(5, 7) + '/' + order.createdAt.slice(8, 10) + '/' + order.createdAt.slice(0, 4) : ''}</td>
                  <td>{i == 0 ? order.status : ''}</td>
                  <td>{orderitem.product.name}</td>
                  <td><small>$</small>{orderitem.product.price}</td>
                  <td>{orderitem.quantity}</td>
                  </tr>
                }),
                <tr key={order.id + 'total'}>
                  <td colSpan ="5" className="text-right"><strong>Order Total:</strong> <small>$</small>{order.total}</td>
                </tr>,
                <tr key={order.id + 'details'}>
                  <td colSpan ="5" className="text-right"><Link to={`/home/${order.id}`}>Order Details</Link></td>
                </tr>]
              })
            }
          </tbody>
        </table>
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

export default connect(mapState, mapDispatch)(UserOrders)
