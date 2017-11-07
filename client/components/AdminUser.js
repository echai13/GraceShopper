import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { AdminUserRow } from './index'


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
            <th />
          </tr>
        </thead>
          { props.users.map(user => {
            return (
              <AdminUserRow key={user.id} user={user} />
            )}
          )}
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
