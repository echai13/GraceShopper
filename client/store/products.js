import axios from 'axios';

import history from '../history';
import { setSingleProductThunk } from './singleProduct';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultProduct = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const removeProduct = () => ({ type: REMOVE_PRODUCT });

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch => axios
    .get('/api/products')
    .then(res => dispatch(getProducts(res.data || defaultProduct)))
    .catch(e => console.error(e));

export const addProductThunk = (product) =>
  dispatch => axios
    .post(`/api/products/`, product)
    .then(() => dispatch(getProductsThunk()))
    .catch(e => console.error(e));

export const editProductThunk = (product, productId) =>
  dispatch => axios
    .put(`/api/products/${productId}`, product)
    .then(updatedProduct => {
      dispatch(setSingleProductThunk(productId))
      dispatch(getProductsThunk())
    })
    .catch(e => console.error(e));

export const removeProductThunk = productId =>
  dispatch => axios
    .delete(`/api/products/${productId}`)
    .then(_ => dispatch(getProductsThunk()))
    .catch(e => console.error(e))

export const searchProducts = searchTerm =>
  dispatch => axios
    .get(`/api/products/search/${searchTerm}`)
    .then(res => {
      dispatch(getProducts(res.data));
      history.push(`/products`);
    })
    .catch(e => console.error(e));

/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  };
};
