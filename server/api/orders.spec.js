const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Address = db.model('address')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  //for viewing all orders for admin
  describe('/api/orders/', () => {

    beforeEach(() => {
      let codysOrder
      let codySmith
      let codysAddress

      return User.create({
        firstName: 'Cody',
        lastName: 'Smith',
        email: 'bob@smith.com',
        password: 'hello'
      })
      .then(user => {
        codySmith = user;

        return Address.create({
          street1: '123',
          city: 'Hi City',
          state: 'TX',
          country: 'USA',
          zipcode: 12345,
          userId: 1
        })
        .then(address => {
          codysAddress = address;

          return Order.create({
            status: 'open',
            addressId: 1,
            userId: 1
          })
          .then(order => {
            codysOrder = order
          })
        })
      })
    })
    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].status).to.be.equal('open')
          expect(res.body[0].addressId).to.be.equal(1)
        })
    })
  })
})
