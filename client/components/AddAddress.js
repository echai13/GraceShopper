import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAddressThunk } from '../store'

/**
 * COMPONENT
 */
export class AddAddress extends Component {
  constructor(){
    super();
    this.state = {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '' }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAddresses(this.props.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();

  }

  handleChange(evt) {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState({key: value})
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Street 1:
          <input type="text"
            name="street1"
            value={this.state.street1}
            onChange={this.handleChange} />
        </label>
        <label>
          Street 2:
          <input type="text"
            name="street2"
            value={this.state.street2}
            onChange={this.handleChange} />
        </label>
        <label>
          City:
          <input type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange} />
        </label>
        <label>
          State:
          <input type="text"
            name="state"
            value={this.state.state}
            onChange={this.handleChange} />
        </label>
        <label>
          Zipcode:
          <input type="text"
            name="zipcode"
            value={this.state.zipcode /* zipcode will need to be a number */ }
            onChange={this.handleChange} /> /
        </label>
        <label>
          Country:
          <input type="text"
            name="country"
            value={this.state.country}
            onChange={this.handleChange} />
        </label>
      </form>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return null;
  }
}

export default connect(mapState, mapDispatch)(AddAddress)
