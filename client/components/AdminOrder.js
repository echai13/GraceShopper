import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


export const AdminOrder = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      { props.orders.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.user.fullName}</td>
              <td>{order.user.email}</td>
              <td>{order.status}</td>
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

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(AdminOrder))
