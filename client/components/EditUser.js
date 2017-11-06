import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { editUserThunk } from '../store/user'

const EditUser = props => {
  console.log(props)
  return (
    <form onSubmit={(evt) => {evt.preventDefault(); props.handleSubmit(props.user.id, {firstName: evt.target.firstName.value, lastName: evt.target.lastName.value, email: evt.target.email.value, password: evt.target.password.value }, props.closeForm)}}>
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

const mapState = state => {
  return {
    user: state.user,
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(userId, userEdits, closeForm) {
      dispatch(editUserThunk(userId, userEdits))
      closeForm()
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditUser))
