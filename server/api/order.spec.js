const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Address = db.model('address')
const Order = db.model('order')
const OrderItem = db.model('orderitem');
const Product = db.model('product');
const withCart = require('./withCart')


describe('Order Route', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/order', () => {
    let codyorder, codysmith, codyaddress,
      orderItemOne, productTest, productPutTest, noOrderUser;

    beforeEach(async () => {
      codysmith = await User.create({
        firstName: 'Cody',
        lastName: 'Smith',
        email: 'bob@smith.com',
        password: 'hello'
      })
      codyaddress = await Address.create({
        street1: '123',
        city: 'Hi City',
        state: 'TX',
        country: 'USA',
        zipcode: 123,
        userId: 1
      })
      codyorder = await Order.create({
        status: 'open',
        addressId: 1,
        userId: 1
      })
      productTest = await Product.create({
        name: 'roselia007',
        image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
        price: '1.45',
        description: 'flowery but techy bundle of cuteness',
        stock: 10
      })
      productPutTest = await Product.create({
        name: 'rose',
        image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
        price: '1.00',
        description: 'flowery b',
        stock: 10
      })
      orderItemOne = await OrderItem.create({
        quantity: 2,
        currentPrice: 1.45,
        orderId: 1,
        productId: 1
      })
      noOrderUser = await User.create({
        firstName: 'No Order',
        lastName: 'User',
        email: 'mary@smith.com',
        password: 'hello'
      })
    })

    beforeEach(() => withCart.clearTestpoints())

    it('GET /api/order with test_cart', () => {
      withCart._test_cart = codyorder
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(withoutTs(codyorder))
        })
    })

    it('GET /api/order with test_session_cartId', () => {
      withCart._test_session_cartId = codyorder.id
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(withoutTs(codyorder))
        })
    })

    it('GET /api/order with test_user for a user with an open cart', () => {
      withCart._test_user = codysmith
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain(withoutTs(codyorder))
        })
    })

    it('GET /api/order with test_user for a user with no open cart', () => {
      withCart._test_user = noOrderUser
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain({id: 2, status: 'open', userId: noOrderUser.id})
        })
    })

    it('GET /api/order creates a new cart when there is no user or cart/cartId', () => {
      withCart._test_user = null
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.contain({ id: 2, status: 'open', userId: null })
        })
    })

    it.only('PUT /api/order to create a new orderItem related to that order', () => {
      withCart._test_user = codysmith
      return request(app)
        .put('/api/order')
        .send({
          productId: productPutTest.id,
          quantity: 2,
          currentPrice: productPutTest.price
        })
        .expect(200)
        .then(res => {
          expect(res.body.orderitems).to.have.lengthOf(2);
        })
    })

  })
})

function withoutTs(model) {
  const data = model.toJSON()
  delete data.updatedAt
  delete data.createdAt
  return data
}
