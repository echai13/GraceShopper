/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Address = db.model('address')
const Order = db.model('order')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    let codySmith
    let codysOrder

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Smith',
        email: codysEmail
      })
        .then(user => {
          // codySmith = user
          return Address.create({
            street1: '123',
            city: 'Hi City',
            state: 'TX',
            country: 'USA',
            zipcode: 12345,
            userId: 1
          })
            .then(address => {
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

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('GET /api/users/:userId/orders', () => {
      return request(app)
        .get('/api/users/1/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].addressId).to.be.equal(codysOrder.addressId)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
