import axios from 'axios'
import history from '../history'

export const sendStripePayment = (cardDetails, amount) =>
  dispatch =>
    // { cardNumber, expMonth, expYear, cvc }
    axios.post('/api/checkout/', { cardDetails, amount })
      .then(history.push('/'))
