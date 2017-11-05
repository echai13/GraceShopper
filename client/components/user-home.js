import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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
  }

  render() {
    const {email} = this.props

    return (
      <div>
        <div>
          <h3>Welcome, {email}</h3>
          <Link to="/orders">Orders</Link>
        </div>
        <hr />
        <div>
          { this.state.showEditForm ?
            <div>
              <button type="submit" onClick={() => {this.setState({showEditForm: false})}}>Close Edit</button>
              <EditUser />
            </div>
            :
            <button type="submit" onClick={() => {this.setState({showEditForm: true})}}>Edit Your Details</button>
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('STATE', state)
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
