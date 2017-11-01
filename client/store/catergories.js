import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories })
const removeCategory = () => ({ type: REMOVE_CATEGORY })

/**
 * THUNK CREATORS
 */

export const getCategoriesThunk = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res => dispatch(getProducts(res.data || defaultCategory)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */

export default function (state = defaultCategory, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
