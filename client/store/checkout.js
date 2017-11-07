import axios from 'axios'
import history from '../history'
import { removeCart } from './index.js'

export const sendStripePayment = (cardDetails, amount, orderId) =>
  dispatch =>
    // { cardNumber, expMonth, expYear, cvc }
    axios.post('/api/checkout/', { cardDetails, amount, orderId })
      .then(dispatch(removeCart()))
      .then(history.push('/'))
