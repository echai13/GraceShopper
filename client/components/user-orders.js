import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getOrdersThunk } from '../store'

/**
 * COMPONENT
 */
export class UserOrders extends Component {
  constructor() {
    super()
  }

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
                        <th>Pet List</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                {
                    !this.props.orders.error ? this.props.orders.map(order => {
                        return order ?
                            order.orderitems.map((orderitem, i) => {
                                return orderitem ? <tr key={i}>
                                <td>{i == 0 ? order.createdAt.slice(0, 10) : ''}</td>
                                <td>{i == 0 ? order.status : ''}</td>
                                <td>{orderitem.product.name}</td>
                                <td>{orderitem.product.price}</td>
                                <td>{orderitem.quantity}</td>
                                <td>{orderitem.quantity} * {orderitem.currentPrice} = {orderitem.subtotal}</td>
                                </tr> : ''
                            }) : ''
                        }) : ''
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
