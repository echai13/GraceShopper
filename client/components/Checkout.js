import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import history from '../history'
import { setAddressThunk, setOrderAddress, sendStripePayment } from '../store'
import { AddAddress } from './index'

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      expMonth: '01',
      expYear: 2017,
      cardNumber: '',
      cvc: '',
      addAddress: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.hideAdd = this.hideAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchCheckoutPage(this.props.user.id)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value }, () => {console.log(this.state)})
  }

  hideAdd(){
    this.setState({addAddress: false})
  }

  render() {
    const cartId = this.props.cart.id;
    return (
      <div className="checkout">
        <div className="address">
          <h3 className="d-flex justify-content-center align-items-center">Addresses</h3>
          <div className="row">
            { this.props.addresses ? this.props.addresses.map((address, index) => (
              <div key={address.id} className="col-md-3">
                <h3>Address #{index + 1}</h3>
                {address.street1}
                { address.street2 ?
                  <span><br />{address.street2}</span> : null
                }
                <br />{address.city}, {address.state} {address.zipcode}
                <br />{address.country}
                <br /><button
                  type="submit"
                  onClick= {() => this.props.setOrderAddress(cartId, address.id)}>Ship To This</button>
              </div>
            )) : null
            }
          </div>
          <button
            className="btn btn-info btn-round"
            onClick={() => {
              this.setState({ addAddress: !this.state.addAddress})
            }}>
            Add Address
          </button>
          {this.state.addAddress && <AddAddress hide={this.hideAdd} />}
        </div>

        <div className="checkout-summary">
          <h3 className="d-flex justify-content-center align-items-center">Checkout Summary</h3>
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
                <td><small>$</small>{item.currentPrice}</td>
                <td>{item.quantity}</td>
              </tr>
          )) : null}
          </tbody>
          </table>
        </div>

        <br />
        <h5><strong>Order total:</strong> {`$${(10 + this.props.cart.total * 1.09).toFixed(2)}`}</h5>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <h3 className="d-flex justify-content-center align-items-center">Enter Payment Information</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
               <form onSubmit={(evt) => { evt.preventDefault(); this.props.handlePayment(this.state, this.props.cart.total, this.props.cart.id, this.props.user.email)}}>
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
                 <button
                   className="btn btn-info btn-round"
                   type="submit">Submit!</button>
               </form>
             </div>
            </div>
          </div>
        </div>

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
    handlePayment(cardData, amount, orderId, email) {
      console.log(cardData)
      dispatch(sendStripePayment(cardData, amount, orderId, email))
    },
    setOrderAddress(id, addressId) {
      dispatch(setOrderAddress({id, addressId}))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))
