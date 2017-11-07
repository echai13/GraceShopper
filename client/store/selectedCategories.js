import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'ADD_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories })

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */

export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
