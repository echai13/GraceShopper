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
            return address && <p key={address.id}>{address.street1}
            {address.street2 && <span><br />{address.street2}</span>}
            <br />{address.city}, {address.state} {address.zipcode}
            <br />{address.country} </p>
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