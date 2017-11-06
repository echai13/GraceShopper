import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import history from '../history'
import { setAddressThunk } from '../store/addresses'
import { sendStripePayment } from '../store/checkout'

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      expMonth: '',
      expYear: 0,
      cardNumber: '',
      cvc: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCheckoutPage(this.props.user.id)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value }, () => {console.log(this.state)})
  }

  render() {
    return (
      <div>
        <h1>Addresses</h1>
        { this.props.addresses ? this.props.addresses.map((address, index) => (
          <div key={address.id}>
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
        <h1>Checkout Summary</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
          { this.props.cart ? this.props.cart.orderitems.map(item => (
            <tr key={item.id}>
              <td><img src={item.image} /></td>
              <td>{item.name}</td>
              <td>{item.currentPrice}</td>
              <td>{item.quantity}</td>
            </tr>
        )) : null}
        </tbody>
        </table>
         <h3>Order total: {this.props.cart.total}</h3>

         <form onSubmit={(evt) => { evt.preventDefault(); this.props.handlePayment(this.state, this.props.cart.total)}}>
           <div>
             <label htmlFor="cardNumber"><small>Card Number</small></label>
             <input onChange={this.handleChange} name="cardNumber" type="text" />
           </div>

           <div>
             <label htmlFor="expMonth"><small>Expiration Month</small></label>
             <select onChange={this.handleChange} name="expMonth">
               { ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(month => (
                 <option key={month}>{month}</option>
               ))}
             </select>
          </div>
          <div>
             <label htmlFor="expYear"><small>Expiration Year</small></label>
             <select onChange={this.handleChange} name="expYear">
               {[2017, 2018, 2019, 2020, 2021, 2022, 2023].map(year => (
                 <option value={year} key={year}>{year}</option>
               ))}
             </select>
           </div>
           <div>
             <label htmlFor="cvc"><small>CVC</small></label>
             <input onChange={this.handleChange} name="cvc" type="text" className="form-control" />
           </div>
           <button type="submit">Submit!</button>
         </form>
       </div>

    )
  }
}


const mapState = state => {
  return {
    user: state.user,
    addresses: state.addresses, //array of addresses
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCheckoutPage(userId) {
      dispatch(setAddressThunk(userId)) //grabbing all addresses associated with user
    },
    handlePayment(cardData, amount) {
      console.log(cardData)
      dispatch(sendStripePayment(cardData, amount))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))
