import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserOrders from './user-orders'
import UserDetails from './user-details'
import { setAddressThunk } from '../store'
import {Link} from 'react-router-dom'
import EditUser from './EditUser'

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      showEditForm: false
    }
    this.updateToggle = this.updateToggle.bind(this)
  }

  updateToggle() {
    console.log(this.state.showEditForm)
    this.setState({ showEditForm: !this.state.showEditForm })
  }

  render() {
    const {user} = this.props

    return (
      <div>
        <div>
          <h3>Welcome, {user.fullName}</h3>
        </div>
        <hr />
        <div>
          { this.state.showEditForm ?
            <div>
              <button type="submit" onClick={this.updateToggle }>Close Edit</button>
              <EditUser closeForm={this.updateToggle} />
            </div>
            :
            <button type="submit" onClick={this.updateToggle}>Edit Your Details</button>
          }
        </div>
        <h4>Account Details</h4>
          <UserDetails />
        <h4>Order History</h4>
          <UserOrders />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)
