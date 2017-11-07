import axios from 'axios'
import history from '../history'
import { setSingleProduct } from './singleProduct'

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

export const addProductThunk = (product) =>
  dispatch =>
    axios.post(`/api/products/`, product)
      .then(() => dispatch(getProductsThunk()))
      .catch(err => console.log(err))

export const editProductThunk = (product, productId) =>
  dispatch =>
    axios.put(`/api/products/${productId}`, product)
      .then(updatedProduct => {
        console.log(updatedProduct.data)
        dispatch(setSingleProduct(updatedProduct.data))
        dispatch(getProductsThunk())
      })
      .catch(err => console.log(err))

export const removeProductThunk = productId =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
    .then(_ => dispatch(getProductsThunk()))
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
