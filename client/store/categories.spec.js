/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { getCategoriesThunk } from './products'
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

  const initialState = { user: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCategories', () => {
    it('eventually dispatches the GET CATEGORIES action', () => {
      const fakeCategories = [
        {id: 1, name: 'plant-type'},
        {id: 2, name: 'water-type'}
      ]
      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
      return store.dispatch(getCategoriesThunk())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CATEGORIES')
          expect(actions[0].categories).to.be.deep.equal(fakeCategories)
        })
    })
  })

})
