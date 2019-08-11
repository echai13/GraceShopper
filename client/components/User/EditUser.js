import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editUserThunk } from '../../store/user';

const EditUser = (props) => {
  const user = props.editUser ? props.editUser : props.user;
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    props.handleSubmit(
      user.id,
      { firstName: evt.target.firstName.value, lastName: evt.target.lastName.value, email: evt.target.email.value, password: evt.target.password.value, isAdmin: evt.target.isAdmin ? evt.target.isAdmin.value : user.isAdmin },
      props.closeForm,
      props.updateThunk)
  }

  return (
    <form onSubmit={handleSubmit}>
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
      {props.editUser &&  <div className="form-group">
        <label ><small>Is Admin?</small>
        <select defaultValue={false} name="isAdmin" type="text" className="form-control">
          <option value={false}>no</option>
          <option value={true}>yes</option>
        </select>
        </label>
      </div> }
      <div className="form-group">
        <button className="btn btn-info btn-round" type="submit">Submit Changes</button>
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
    handleSubmit(userId, userEdits, closeForm, updateThunk) {
      dispatch(editUserThunk(userId, userEdits, updateThunk))
      closeForm()
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditUser))
