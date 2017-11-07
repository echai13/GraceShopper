import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateCartStatus, getAdminOrders } from '../store'


export const AdminOrder = (props) => {
  console.log('order info ---> ', props.orders[0])
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      { props.orders.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.user ? order.user.fullName : 'Unauth User'}</td>
              <td>{order.user ? order.user.email : 'Unauth User'}</td>
              <td>
                <p>{order.address.street1}</p>
                <p>{order.address.street2}</p>
                <p>{order.address.city},
                    {order.address.state}
                    {order.address.country}
                    {order.address.zipcode}</p>
              </td>
              <td>
                  <select
                  defaultValue={order.status}
                  name="orderStatus"
                  type="text"
                  className="form-control"
                  onChange={(evt) => {
                    console.log(evt.target.value);
                    props.updateStatus(order.id, evt.target.value)
                  }}>
                    <option value="open">open</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="completed">completed</option>
                  </select>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
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
