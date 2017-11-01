const {expect} = require('chai')
const db = require('../index')
const OrderItem = db.model('orderitem')
const Order = db.model('order')
const Product = db.model('product')
const User = db.model('user')
const Address = db.model('address')

describe('Order item model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('instanceMethods', () => {
        let codyorder;
        let codysmith;
        let codyaddress;
        let codyitem;

        beforeEach(() => {
            return User.create({
                firstName: 'Cody',
                lastName: 'Smith',
                email: 'bob@smith.com',
                password: 'hello'
            })
            .then(user => {
                codysmith = user;

                return Address.create({
                    street1: '123',
                    city: 'Hi City',
                    state: 'TX',
                    country: 'USA',
                    zipcode: 123,
                    userId: 1
                })
                .then(address => {
                    codyaddress = address;

                    return Order.create({
                        status: 'open',
                        addressId: 1,
                        userId: 1
                    })
                    .then(order => {
                        codyorder = order

                        return Product.create({
                            name: 'robocat',
                            price: 1.00,
                            description: 'a robot cat'
                        })
                        .then(product => {
                            return OrderItem.create({
                                productId: product.id,
                                quantity: 2,
                                orderId: 1,
                                currentPrice: '1.00'
                            })
                            .then(orderitem => {
                                codyitem = orderitem;
                            })
                        })
                    })
                })  
            })
        })

        describe('fields', () => {
            it('has a status, addressId, and userId', () => {
                expect(codyitem.productId).to.be.equal(1)
                expect(codyitem.quantity).to.be.equal(2)
                expect(codyitem.orderId).to.be.equal(1)
                expect(codyitem.currentPrice).to.be.equal('1.00')
            })
        })

        describe('subtotal getter', () => {
            it('should return the subtotal', () => {
                expect(codyitem.subtotal).to.be.equal(codyitem.quantity * codyitem.currentPrice)
            })
        })
    })
})