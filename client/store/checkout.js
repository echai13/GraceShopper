import axios from 'axios'
import history from '../history'

export const sendStripePayment = (cardDetails, amount, email) =>
dispatch =>
    // { cardNumber, expMonth, expYear, cvc }
    axios.post('/api/checkout/', { cardDetails, amount, email })
      .then( () => {
        console.log('the email in the store', email)
        history.push('/')})
