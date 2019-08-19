//import axios from 'axios'
import history from '../history'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const REMOVE_CART = 'REMOVE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

/**
 * INITIAL STATE
 */
let defaultCart = [];


/**
 * ACTION CREATORS
 */
export const getCart = cart => ({ type: GET_CART, cart })
export const addToCart = cart => ({type: ADD_TO_CART, cart}) // thunk will take product and return new cart
export const removeFromCart = cart => ({type: REMOVE_FROM_CART, cart})
export const deleteFromCart = cart => ({type: DELETE_FROM_CART, cart})
export const removeCart = () =>  ({ type: REMOVE_CART })

/**
 * THUNKS
 */
const formatCart = (res) => {
    const cart = res.data;
    
    const orderItems = cart.orderitems;
    const includeProducts = orderItems.map(item => {
      return Object.assign({}, item, item.product, {id: item.id});
    })

    console.log('includeProducts: ', includeProducts);
    sortByCreationDate(includeProducts);
    cart.orderitems = includeProducts;
    return cart;
}

const sortByCreationDate = (products) => {
  const result = products.sort((a, b) => {
    const first = new Date(a.createdAt);
    const second = new Date(b.createdAt);

    return (first.getTime() - second.getTime());
  });

  console.log('result in cart: ', result);
  return result;
}

export const getCartThunk = () => dispatch => {
  return axios.get('/api/order')
    .then(res => {
      console.log('axios call is returning', res);
      dispatch(getCart( formatCart(res) || defaultCart ))
    })
    .catch(err => console.log(err))
}

export const changeQuantityThunk = (productInfo) => dispatch => {
  return axios.put('/api/order/incart', {productInfo})
    .then(res => {
      dispatch(getCart(formatCart(res) || defaultCart))
    })
    .catch(err => console.log(err))
}

export const deleteFromCartThunk = (orderItemId) => dispatch => {
  return axios.delete(`/api/order/incart/${orderItemId}`)
    .then(res => {
      dispatch(getCart(formatCart(res) || defaultCart))
    })
    .catch(err => console.log(err))
}

export const updateCartStatus = (orderId, status, getAdminOrders) =>
  dispatch => {
    console.log('inside updateCartStatus with getAdminOrders: ', getAdminOrders)
    return axios.put(`/api/orders/${orderId}`, {status})
      .then(() => {
        console.log('is it trying to dispatch this? ')
        return dispatch(getAdminOrders())
      })
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  //let products, searchid;

  switch (action.type) {

    case GET_CART:
      return action.cart;

    case ADD_TO_CART:
      return action.cart;

    case REMOVE_CART:
      return [];

    default:
      return state;
  }
}
