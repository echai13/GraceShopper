import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { updateCartStatus, getAdminOrders } from '../../../store';

export class AdminOrder extends Component {
  render() {
    const orders = this.props.orders
    return (
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => {
              return ( (this.props.orderStatus === 'all' || order.status === this.props.orderStatus ) &&
               ( <tr key={order.id}>
                  <td>{order.user ? order.user.fullName : 'Unauth User'}</td>
                  <td>{order.user ? order.user.email : 'Unauth User'}</td>
                  <td className="address">
                    <br />
                    {order.address && order.address.street1}
                    {order.address && order.address.street2 &&
                    <span>
                      <br />
                      {order.address.street2}
                    </span>}
                    <br />
                    {order.address && order.address.city + ', ' + order.address.state + ' ' + order.address.zipcode}
                    <br />
                    {order.address && order.address.country}
                  </td>

                  <td className="select">
                    <select
                      defaultValue={order.status}
                      name="orderStatus"
                      type="text"
                      className="form-control"
                      onChange={(evt) => {
                        console.log(evt.target.value);
                        this.props.updateStatus(order.id, evt.target.value)
                      }}>
                      <option value="open">open</option>
                      <option value="confirmed">confirmed</option>
                      <option value="shipped">shipped</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                  <td><small>$</small>{order.total.toFixed(2)}</td>
                  <td>
                    {order && (order.createdAt.slice(5, 7) + '/' + order.createdAt.slice(8, 10) + '/' + order.createdAt.slice(0, 4) + ' ')}
                at {order ? (
                    order.createdAt.slice(11, 13) <= 12 ? order.createdAt.slice(11, 13) + ':' + order.createdAt.slice(14, 16) + ' AM'
                    : (Number(order.createdAt.slice(11, 13)) - 12) + ':' + order.createdAt.slice(14, 16) + ' PM'
                    ) : ''
                }
                  </td>
                </tr>)
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}

const mapState = state => {
  return {
    orders: state.admin.orders
  }
}

const mapDispatch = dispatch => {
  return {
    updateStatus(id, status){
      dispatch(updateCartStatus(id, status, getAdminOrders));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AdminOrder))
