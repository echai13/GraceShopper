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
      orderItemOne, productTest;

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
        stock: 10,
        reviews: ['needs no sunlight! woot!', 'love her foreva']
      })
      orderItemOne = await OrderItem.create({
        quantity: 2,
        currentPrice: 1.45,
        orderId: 1,
        productId: 1
      })
    })

    beforeEach(() => withCart.clearTestpoints())

    it('GET /api/order with test_cart', () => {
      withCart._test_cart = codyorder
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          //console.log('inside spec GET /api/order: ', res.body);
          expect(res.body).to.contain(withoutTs(codyorder))
          // expect(res.body).to.be.an('object')
          // expect(res.body.status).to.be.equal(codyorder.status)
          // expect(res.body.addressId).to.be.equal(codyaddress.id)
        })
    })

    it('GET /api/order with test_cart', () => {
      withCart._test_cart = codyorder
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          //console.log('inside spec GET /api/order: ', res.body);
          expect(res.body).to.contain(withoutTs(codyorder))
          // expect(res.body).to.be.an('object')
          // expect(res.body.status).to.be.equal(codyorder.status)
          // expect(res.body.addressId).to.be.equal(codyaddress.id)
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
