import axios from 'axios'

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
  dispatch =>
    axios.get(`/api/addresses/${userId}`)
      .then(res => {
        dispatch(setAddress(res.data))
      })
      .catch(err => console.log(err))


export const addAddress = addressData =>
  dispatch =>
    axios.post(`/api/addresses/`, addressData)
      .then(res => {
        dispatch(setAddress(res.data))
      })
      .catch(err => console.log(err))

export const setOrderAddress = ({ id, addressId }) =>
  _ => axios
    .put('api/order/changeaddr', { id, addressId })
    .catch(err => console.error('address: ', err))


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
