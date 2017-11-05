import axios from 'axios'
import history from '../history'

export const getAllOrders = () =>
  dispatch =>
    axios.get('/api/orders/')
