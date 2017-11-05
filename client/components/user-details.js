import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { setAddressThunk } from '../store'

/**
 * COMPONENT
 */
export class UserDetails extends Component {

  componentDidMount() {
    this.props.fetchAddresses(this.props.id);
  }

  render() {
    return (
      <div>
        { 
          this.props.addresses.map(address => {
            return address ? <div key={address.id}><p>{address.street1}</p>
            <p>{address.street2}</p>
            <p>{address.city}, {address.state} {address.zipcode}</p>
            <p>{address.country}</p> </div> : ''
          })
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.user.id,
    addresses: state.addresses
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddresses (id) {
      dispatch(setAddressThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserDetails)