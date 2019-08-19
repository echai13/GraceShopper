import axios from 'axios'
import history from '../history'
import { removeCart } from './index.js'

export const sendStripePayment = (cardDetails, amount, orderId, email) =>
  dispatch => axios
    .post('/api/checkout/', { cardDetails, amount, orderId, email })
    .then(_ => dispatch(removeCart()))
    .then(_ => history.push('/'))
    .catch(e => console.error('e in dispatch: ', e));
