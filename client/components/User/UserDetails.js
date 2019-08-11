import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { setAddressThunk } from '../../store';
import { Address } from '../Address/';

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
        <div className="row">
        {

          this.props.addresses.map(address => {
            return (
              address && <div className="col-md-3" key={address.id}><p>{address.street1}
              {address.street2 && <span><br />{address.street2}</span>}
              <br />{address.city}, {address.state} {address.zipcode}
              <br />{address.country} </p></div>
            )
          })

        }
        </div>
        <button
          className="btn btn-info btn-round"
          onClick={() => {
            this.setState({ addAddress: !this.state.addAddress })
          }}>
          Add Address
          </button>
        {this.state.addAddress && <Address hide={this.hideAdd} />}
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
