import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserOrders from './user-orders'
import UserDetails from './user-details'
import { setAddressThunk, me } from '../store'
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
      <div className="user-home d-flex justify-content-center">
        <span>
          <h3>Welcome, {user.fullName}</h3>
          { this.state.showEditForm ?
            <button
              className="btn btn-info btn-round"
              type="submit"
              onClick={this.updateToggle}
            >
              Close Edit
            </button>
            :
            <button
              className="btn btn-info btn-round"
              type="submit"
              onClick={this.updateToggle}>Edit Your Details</button>
          }
          <hr />

          { this.state.showEditForm &&
            <EditUser closeForm={this.updateToggle} updateThunk={me} />
          }

          <h4>Account Details</h4>
          <h5>Your Addresses</h5>
          <UserDetails />
          
          <h4>Order History</h4>
          <UserOrders />
        </span>
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
