import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAddressThunk, setOrderAddress, sendStripePayment, me } from '../store'
import { Address } from '../components/Address/';

import './checkout.scss';

const numericMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const getYears = () => {
  const date = new Date();

  const year = date.getFullYear();
  const creditCardYears = [year];
  const MAX_NUM_YEARS = 8;

  for (let y = 1; y < MAX_NUM_YEARS; y++) {
    const nextYear = year + y;

    creditCardYears.push(nextYear);
  }

  return creditCardYears;
};

const creditCardYears = getYears();

const SHIPPING_FEE = 10;
const TAX_RATE = 1.09;

const calculateOrderTotal = (itemsTotal) => {
  const currency = '$';
  const subtotal = itemsTotal * TAX_RATE;
  const total = (SHIPPING_FEE + subtotal).toFixed(2);

  return `${currency}${total}`;
}

export class Checkout extends Component {
  state = {
    expMonth: '01',
    expYear: new Date().getFullYear(),
    cardNumber: '',
    cvc: '',
    addAddress: false,
  };

  static propTypes = {
    user: PropTypes.object,
    addresses: PropTypes.array,
    cart: PropTypes.object,
  };

  componentDidMount() {
    this.props.fetchCheckoutPage(this.props.user.id);
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;

    this.setState({ [name]: value });
  };

  handleAddressForm = () => this.setState(prevState => ({
    addAddress: !prevState.addAddress,
  }));

  handleAddressClick = (addressId) => () => {
    this.props.setOrderAddress(this.props.cart.id, addressId);
  };

  handleSubmitPayment = (event) => {
    event.preventDefault();

    this.props.handlePayment(
      this.state,
      this.props.cart.total,
      this.props.cart.id,
      this.props.user.email
    );
  }

  renderAddresses = () => {
    return this.props.addresses && this.props.addresses.map((address, index) => (
      <div key={address.id} className="col-md-3 addresses">
        
        {address.street1}
        {address.street2 && <span>
          <br />
          {address.street2}
        </span>}

        <br />
        {address.city}, {address.state} {address.zipcode}
        <br />
        {address.country}
        <br />
        
        <button
          className="btn btn-primary btn-round"
          type="submit"
          onClick={this.handleAddressClick(address.id)}
        >
            Ship To This
        </button>
      </div>
    ))
  };

  renderCart = () => {
    return (
      (this.props.cart && this.props.cart.orderitems) && this.props.cart.orderitems.map(this.renderOrderItem)
    );
  };

  renderOrderItem = (item) => {
    return (
      <tr key={item.id}>
        <td><img src={item.image} /></td>
        <td>{item.name}</td>
        <td><small>$</small>{item.currentPrice}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  };

  renderPaymentForm = () => {
    return (
      <form onSubmit={this.handleSubmitPayment}>
        <div>
          <label htmlFor="cardNumber"><small>Card Number</small></label>
          <input onChange={this.handleChange} name="cardNumber" type="text" />
        </div>

        <div>
          <label htmlFor="expMonth"><small>Expiration Month</small></label>
          <select onChange={this.handleChange} name="expMonth">
            {numericMonths.map(month => (
              <option key={month}>{month}</option>
            ))}
          </select>
      </div>

      <div>
        <label htmlFor="expYear"><small>Expiration Year</small></label>
        <select onChange={this.handleChange} name="expYear">
          {creditCardYears.map(year => (
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
          type="submit"
        >
          Submit!
        </button>
      </form>
    );
  };

  render() {
    return (
      <div className="checkout">
        <div className="address">
          <h3 className="d-flex justify-content-center align-items-center">1. Select Shipping Address</h3>
          <div className="row">
            {this.renderAddresses()}

            <div className="col-md-3 add-address-btn">
              <button
                className="btn btn-info btn-round"
                onClick={this.handleAddressForm}
              >
                {this.state.addAddress ? 'Close Form' : 'Add Address'}
              </button>
            </div>
          </div>
          {this.state.addAddress && <Address hide={this.handleAddressForm} />}
        </div>

        <div className="checkout-summary">
          <h3 className="d-flex justify-content-center align-items-center">2. Checkout Summary - Review</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{this.renderCart()}</tbody>
          </table>
        </div>

        <br />
        <h5>
          <strong>Order total: &nbsp;</strong>
          {calculateOrderTotal(this.props.cart.total)}
        </h5>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <h3 className="d-flex justify-content-center align-items-center">3. Enter Payment Information</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                {this.renderPaymentForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  addresses: state.addresses, //array of addresses
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  fetchCheckoutPage(userId) {
    dispatch(setAddressThunk(userId)) //grabbing all addresses associated with user
  },
  handlePayment(cardData, amount, orderId, email) {
    dispatch(sendStripePayment(cardData, amount, orderId, email))
  },
  setOrderAddress(id, addressId) {
    dispatch(setOrderAddress({id, addressId}))
  },
  getUser() {
    dispatch(me())
  },
});

export default withRouter(connect(mapState, mapDispatch)(Checkout));
