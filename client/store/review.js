import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_REVIEWS = 'REMOVE_REVIEWS'
const MAKE_REVIEWS = 'MAKE_REVIEWS'
/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getReviews = review => ({type:GET_REVIEWS, review})
const makeReviews = review => ({type: MAKE_REVIEWS, review})
// const removeReviews = () => ({type: REMOVE_REVIEWS})

/**
 * THUNK CREATORS
 */

export const getReviewsThunk = () =>
  dispatch =>
    axios.get(`/api/products/${productId}/reviews`)
      .then(res => dispatch(getReviews(res.data || defaultReviews)))
      .catch(err => console.log(err))

export const makeReviewsThunk = (review, id) => 
  dispatch => 
    axios.post(`/api/products/${id}/reviews`, review)
      .then(res => dispatch(getReviews(res.data || defaultReviews)))
      .catch(err => console.log(err))
 
/*
 * REDUCER
 */

export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.review
    case MAKE_REVIEWS:
      return action.review
    default:
      return state
  }
}
