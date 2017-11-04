import axios from 'axios'
import history from '../history'


/**
* ACTION TYPES
*/
const SET_ADDRESSES = 'SET_ADDRESSES'

/**
* INITIAL STATE
*/
const defaultState = []

/**
* ACTION CREATORS
*/
export const setAddress =  addresses => {
  return { type: SET_ADDRESSES, addresses }
}

/**
* THUNK CREATORS
*/
export const setAddressThunk = userId =>
  dispatch => //api/addresses/1
    axios.get(`/api/addresses/${userId}`)
      .then(res => {
        dispatch(setAddress(res.data))
      })
      .catch(err => console.log(err))

/**
* REDUCER
*/

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_ADDRESSES:
      return action.addresses
    default:
      return state
  }
}
