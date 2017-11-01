/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProductsThunk} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {
      const fakeProduct = {
        id: 1,
        name: 'roselia007',
        image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
        price: '1.45',
        description: 'flowery but techy bundle of cuteness',
        stock: 10,
        category: ['plant-type'],
        reviews: [ 'needs no sunlight! woot!', 'love her foreva']
      }
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      return store.dispatch(getProductsThunk())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProduct)
        })
    })
  })

})
