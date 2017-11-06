import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { setAddressThunk } from '../store'
import { AddAddress } from './index'

/**
 * COMPONENT
 */
export class UserDetails extends Component {
  constructor(){
    super();
    this.state = {
      addAddress: false
    }
    this.hideAdd = this.hideAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchAddresses(this.props.id);
  }

  hideAdd() {
    this.setState({ addAddress: false })
  }

  render() {
    return (
      <div>
        {
          this.props.addresses.map(address => {
            return address ?
            <div key={address.id}>
              <h3>Address</h3>
              <p>{address.street1}</p>
              <p>{address.street2}</p>
              <p>{address.city}, {address.state} {address.zipcode}</p>
              <p>{address.country}</p>
            </div> : ''
          })
        }
        <button
          onClick={() => {
            this.setState({ addAddress: !this.state.addAddress })
          }}>
          Add Address
          </button>
        {this.state.addAddress && <AddAddress hide={this.hideAdd} />}
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
