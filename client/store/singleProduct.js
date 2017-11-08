import axios from 'axios'
import history from '../history'

/**
* ACTION TYPES
*/
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

/**
* INITIAL STATE
*/
const singleProduct = {}

/**
* ACTION CREATORS
*/
export const setSingleProduct = product => {
  return { type: SET_SINGLE_PRODUCT, product }
}

/**
* THUNK CREATORS
*/
export const setSingleProductThunk = productId =>
  dispatch => {
    axios.get(`/api/products/${productId}`)
      .then(res => {
        dispatch(setSingleProduct(res.data))
      })
      .catch(err => console.log(err))
    }

export const addProductToCart = productInfo => dispatch =>
      {
        axios.put('/api/order/inproduct', {productInfo})
        .then( cart => {
          console.log('axios finished with: ', cart)
          history.push('/cart');
          dispatch(setSingleProduct(singleProduct))
        })
        .catch(err => console.log(err))
      }

/**
* REDUCER
*/

export default function (state = singleProduct, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
