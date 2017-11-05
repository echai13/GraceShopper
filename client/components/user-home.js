import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserOrders from './user-orders'
import UserDetails from './user-details'
import { setAddressThunk } from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props
  
    return (
      <div>
        <h3>Welcome, {name}</h3>
        <h4>Account Details</h4>
          <UserDetails />
        <h4>Order History</h4>
          <UserOrders />
      </div>
    )
  }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.firstName,
  }
}

export default connect(mapState)(UserHome)
