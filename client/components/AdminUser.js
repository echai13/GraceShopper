import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


export const AdminUser = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          { props.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'yes' : 'no'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    users: state.admin.users
  }
}

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(AdminUser))
