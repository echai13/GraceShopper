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
                        <th className="text-right">Date Ordered</th>
                        <th className="text-right">Status</th>
                        <th className="text-right">Pet List</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    !this.props.orders.error ? this.props.orders.map(order => {
                        return order ? <tr key={order.id}>
                        <td>{order.createdAt.slice(0, 10)}</td>
                        <td>{order.status}</td>
                        {
                            order.orderitems.map(orderitem => {
                                return orderitem ? <div key={orderitem.id}>
                                <td>{orderitem.product.name}</td>
                                <td>{orderitem.product.price}</td>
                                <td>{orderitem.quantity}</td>
                                </div> : ''
                            })
                        }
                        <tr>Order Total: ${order.findOrderTotal}</tr>
                        </tr> : ''
                    }): ''
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