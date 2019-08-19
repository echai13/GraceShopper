 import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => {
  return dispatch => axios
    .get('/auth/me')
    .then(res => {
      console.log('res: ', res);
      dispatch(getUser(res.data || defaultUser))
    })
    .catch(err => console.log(err))
}

export const auth = (email, password, method, firstName, lastName) =>
  dispatch => {
    axios.post(`/auth/${method}`, { email, password, firstName, lastName })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      })
      .catch(error =>
        dispatch(getUser({error})))
    }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const orders = (userId) =>
  dispatch => {
    axios.get(`/api/users/${userId}/orders`)
      .then(res => {
        dispatch(getOrders(res.data))
      })
      .catch(error =>
        dispatch(getOrders({error})))
  }


export const getAllUsers = () =>
  dispatch => {
    return axios.get('/api/users')
      .then(res => res.data);
  }

export const editUserThunk = (userId, userEdits, updateThunk) =>
  dispatch => {
    axios.put(`/api/users/${userId}`, userEdits)
      .then(() => dispatch(updateThunk()))
      .catch(err => console.log(err))
  }

export const deleteUserThunk = (userId, updateThunk) =>
  dispatch => {
    axios.delete(`/api/users/${userId}`)
      .then(() => dispatch(updateThunk()))
      .catch(err => console.log(err));
  }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
