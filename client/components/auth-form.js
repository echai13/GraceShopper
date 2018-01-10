import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  const randomImages = [
    'https://images.pexels.com/photos/96428/pexels-photo-96428.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/38008/pexels-photo-38008.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
  ]
  return (
    <div className="row login-signup" style={{ background: `url(${randomImages[Math.floor(4 * Math.random())]}) fixed center no-repeat`, backgroundSize: 'cover' }}>
      <div className="col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} name={name} className="auth-form">
        { name === 'signup' ?
        <span>
        <div className="form-group">
          <label htmlFor="firstName"><small>First Name</small></label>
          <input name="firstName" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName"><small>Last Name</small></label>
          <input name="lastName" type="text" className="form-control" />
        </div>
        </span> : null
        }
        <div className="form-group">
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" className="form-control" />
        </div>
        <div className="form-group login-signup-button">
          <button className="btn btn-info btn-round" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapLoginDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapSignupDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
