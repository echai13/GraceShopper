import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const EditUser = props => {
  return (
    <form onSubmit={}>
      <div className="form-group">
        <label htmlFor="firstName"><small>First Name</small></label>
        <input name="firstName" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="lastName"><small>Last Name</small></label>
        <input name="lastName" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="email"><small>Email</small></label>
        <input name="email" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password"><small>Password</small></label>
        <input name="password" type="password" className="form-control" />
      </div>
      <div className="form-group">
        <button type="submit">Submit Changes</button>
      </div>
    </form>
  )
}

const mapState = null
const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(EditUser))
