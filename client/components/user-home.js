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
    this.updateToggle = this.updateToggle.bind(this)
  }

  updateToggle() {
    console.log(this.state.showEditForm)
    this.setState({ showEditForm: !this.state.showEditForm })
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
              <button type="submit" onClick={this.updateToggle }>Close Edit</button>
              <EditUser closeForm={this.updateToggle} />
            </div>
            :
            <button type="submit" onClick={this.updateToggle}>Edit Your Details</button>
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
    user: state.user,
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
