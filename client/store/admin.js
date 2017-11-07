import history from '../history'
import axios from 'axios'

let defaultAdmin = {}

const SET_ADMIN_USERS = 'SET_ADMIN_USERS'
const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'

export const setAdminUsers = users => ({ type: SET_ADMIN_USERS, users })
export const setAdminOrders = orders => ({ type: SET_ADMIN_ORDERS, orders })

export const getAdminUsers = () =>
  dispatch =>
    axios.get(`/api/users`)
      .then(users => {
        console.log(users)
        dispatch(setAdminUsers(users.data))
      })

export const getAdminOrders = () =>
  dispatch =>
      axios.get(`/api/orders`)
      .then(orders => {
        console.log(orders)
        dispatch(setAdminOrders(orders.data))
      })


export default function (state = defaultAdmin, action) {
  switch (action.type) {
    case SET_ADMIN_USERS:
      return Object.assign({}, state, {users: action.users})
    case SET_ADMIN_ORDERS:
      return Object.assign({}, state, {orders: action.orders})
    default:
      return state
  }
}
