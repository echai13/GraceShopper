import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AdminUserRow } from '../';

export const AdminUser = (props) => {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Admin?</th>
            <th />
            <th>Delete</th>
          </tr>
        </thead>
          { props.users && props.users.map(user => {
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
