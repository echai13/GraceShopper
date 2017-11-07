import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { addAddress } from '../store'

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

  handleSubmit(evt) {
    evt.preventDefault();
    const addressInfo = this.state;
    addressInfo.userId = this.props.id;
    this.props.addAddress(addressInfo)
    this.setState({
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    })
    this.props.hide();
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value})
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Add a New Address
        <label>
          Street 1:
          <input
          type="text"
            name="street1"
            value={this.state.street1}
            onChange={this.handleChange} />
        </label>
        <label>
          Street 2:
          <input
          type="text"
            name="street2"
            value={this.state.street2}
            onChange={this.handleChange} />
        </label>
        <label>
          City:
          <input
          type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange} />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={this.state.state}
            onChange={this.handleChange} />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={this.state.zipcode /* zipcode will need to be a number */ }
            onChange={this.handleChange} />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={this.state.country}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
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
  return {
    addAddress(addressInfo){
      dispatch(addAddress(addressInfo));
    }
  }
}

// could probably take off withRouter... originally put there in case
// we would have it take them to a new page and then use goBack to return to the prev page
export default withRouter(connect(mapState, mapDispatch)(AddAddress))
