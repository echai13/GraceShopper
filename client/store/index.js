import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import categories from './categories'
import singleProduct from './singleProduct'
import addresses from './addresses'
import checkout from './checkout'
import cart from './cart'
import orders from './orders'
import admin from './admin'
import review from './review'

const reducer = combineReducers({user, products, categories, singleProduct, addresses, cart, orders, admin, review})


const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './categories'
export * from './singleProduct'
export * from './addresses'
export * from './checkout'
export * from './cart'
export * from './orders'
export * from './admin'
export * from './review'
