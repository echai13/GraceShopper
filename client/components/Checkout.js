import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import history from '../history'
import { setAddressThunk } from '../store/addresses'

export class Checkout extends Component {
  componentDidMount() {
    console.log(this.props.user)
    this.props.fetchCheckoutPage(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h1>Addresses</h1>
        { this.props.addresses ? this.props.addresses.map((address, index) => (
          <div key="address.id">
            <h3>Address #{index + 1}</h3>
            <p>{address.street1}</p>
            { address.street2 ?
              <p>{address.street2}</p> : null
            }
            <p>{address.city}, {address.state} {address.zipcode}</p>
            <p>{address.country}</p>
            <button type="submit">Ship To This</button>
          </div>
        )) : null
        }
      </div>

    )
  }
}


const mapState = state => {
  return {
    user: state.user,
    addresses: state.addresses //array of addresses
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCheckoutPage(userId) {
      console.log(userId)
      dispatch(setAddressThunk(userId)) //grabbing all addresses associated with user

    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))
