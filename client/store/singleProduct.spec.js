import {expect} from 'chai'
import { setSingleProductThunk } from './singleProduct'
import { setSingleProduct } from './index'
// import {getProductsThunk} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Single Product redux tests', () => {
  const product = {
    id: 1,
    name: 'roselia007',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1.45',
    description: 'flowery but techy bundle of cuteness',
    stock: 10,
    category: ['plant-type'],
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }
  describe('action creators', () => {
    it('setSingleProduct returns SET_SINGLE_PRODUCT action', () => {
      const action = setSingleProduct(product)
      expect(action).to.deep.equal({ type: 'SET_SINGLE_PRODUCT', product})
    })
  })

  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {singleProduct: {}}

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('getSingleProduct', () => {
      it('eventually dispatches the GET SINGLE PRODUCT action', () => {
        mockAxios.onGet(`/api/products/${product.id}`).replyOnce(200, product)
        return store.dispatch(setSingleProductThunk(product.id))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('SET_SINGLE_PRODUCT')
          expect(actions[0].product).to.be.deep.equal(product)
        })
      })
    })
  })
})
