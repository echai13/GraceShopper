import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const removeProduct = () => ({type: REMOVE_PRODUCT})

/**
 * THUNK CREATORS
 */

export const getProductsThunk = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => dispatch(getProducts(res.data || defaultProduct)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */

export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
