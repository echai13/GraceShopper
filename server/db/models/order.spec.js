const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Address = db.model('address')
const OrderItem = db.model('orderitem');
const Product = db.model('product');

describe('Order model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('instanceMethods', () => {
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

        describe('fields', () => {
            it('has a status, addressId, and userId', () => {
                expect(codyorder.status).to.be.equal('open')
                expect(codyorder.addressId).to.be.equal(1)
                expect(codyorder.userId).to.be.equal(1)
            })

            it('can get a order total using an instance method', async () => {
              const total = await codyorder.findOrderTotal();
              expect(total).to.be.equal(orderItemOne.quantity * orderItemOne.currentPrice);
            })

            it('will also get orderitem and product info when you search for the order', async () => {
              codyorder = await Order.findByPk(1);

              const orderItems = codyorder.orderitems;
              const products = orderItems.map( item => item.product)

              expect(orderItems).to.have.lengthOf(1);
              expect(orderItems[0]).to.have.property('currentPrice', '1.45');
              expect(products).to.have.lengthOf(1);
              expect(products[0]).to.have.property('name', 'roselia007');
            })
        })
    })
})
