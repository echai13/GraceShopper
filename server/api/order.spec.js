const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Address = db.model('address')
const Order = db.model('order')


describe('Order routes', () => {
  beforeEach(() => {
    return db.sync()
  })

  //for viewing all orders for admin
  describe('/api/order/', () => {
    it('GET /api/order', () => {
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body).to.be.an('array')
        })
    })
  })
})
