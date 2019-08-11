import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import {Main, Checkout} from './components'
import { AdminPanel } from './components/Admin/';
import { UserHome, UserOrderDetails } from './components/User/';
import { Products, SingleProduct } from './components/Product/';
import { Cart } from './components/Cart/';
import { HomePage } from './components/HomePage';
import { Address } from './components/Address';
import { Login, Signup } from './components/Auth';

import {me, getCategoriesThunk, getProductsThunk} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            
            <Route exact path="/products" component={Products} />
            {
              isAdmin &&
                <Route exact path="/admin" component={AdminPanel} />

            }
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/home" component={UserHome} />
                  <Route exact path="/home/:orderId" component={UserOrderDetails} />
                  <Route exact path="/addresses/add" component={Address} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(getCategoriesThunk())
      dispatch(getProductsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
