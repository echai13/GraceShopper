import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateCartStatus, getAdminOrders } from '../store'


export class AdminOrder extends Component {
  constructor(){
    super();
    this.state = {statusView: 'all'}
    this.updateStatusView = this.updateStatusView.bind(this);
  }

  updateStatusView = (status) => {
    this.setState({statusView: status})
  }

  render() {
    const orders = this.props.orders
    const statuses = ['open', 'completed', 'confirmed', 'shipped']
    console.log('order info ---> ', orders[0])
    return (
      <div>
        <div className="statuses">
          <button key={0} onClick={() => this.updateStatusView('all')}>All</button>
          {statuses.map((status, idx) => (
            <button key={idx} onClick={() => this.updateStatusView(status)}>{status}</button>
          ))}
        </div>
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
            {orders.map(order => {
              return ( (this.state.statusView === 'all' || order.status === this.state.statusView ) &&
               ( <tr key={order.id}>
                  <td>{order.user ? order.user.fullName : 'Unauth User'}</td>
                  <td>{order.user ? order.user.email : 'Unauth User'}</td>
                  <td>
                    <p>{order.address && order.address.street1}</p>
                    <p>{order.address && order.address.street2}</p>
                    <p>{order.address && order.address.city},
                      {order.address && order.address.state}
                      {order.address && order.address.country}
                      {order.address && order.address.zipcode}</p>
                  </td>
                  <td>
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
                  <td>{order.total.toFixed(2)}</td>
                  <td>{order && (order.createdAt.slice(5, 7) + '/' + order.createdAt.slice(8, 10) + '/' + order.createdAt.slice(0, 4) + ' ')}</td>
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
      console.log('has getAdminOrders: ', getAdminOrders)
      dispatch(updateCartStatus(id, status, getAdminOrders));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AdminOrder))
