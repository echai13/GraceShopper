import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter, Link } from 'react-router-dom'
import { logout, removeCart, searchProducts } from '../store'

export const NavBar = (props) => {
  const {handleClick, isLoggedIn, handleSubmit, isAdmin} = props
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand store-name">BorgPetCo</Link>
        <form className="form-inline" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2" type="text" placeholder="Search" name="search" />
          <button className="btn my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div>
              <Link to="/products">Shop Now</Link>
            </div>
          { isLoggedIn ?
            <div>
              <Link to="/home">Your Account</Link>
              <Link to="/home" onClick={handleClick}>Logout</Link>
              { isAdmin ? <Link to="/admin">Admin</Link> : null}
            </div>
            : <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          }
          <div>
            <Link to="/cart" className="shopping-cart"><i className="fa fa-shopping-cart" /><span className="badge" /></Link>
            {/*  badge will changed base on number of cartItems in cart */}
          </div>
        </div>
      </div>
    </nav>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id, //coerces empty objects to boolean
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
      dispatchEvent(removeCart)
      //dispatch removeUser (from store)
      //dispatch removeCart(from store)
    },
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(searchProducts(evt.target.search.value)) //searchProducts from store reducer
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))

NavBar.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
