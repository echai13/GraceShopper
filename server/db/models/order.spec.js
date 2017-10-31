const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Address = db.model('address')

describe('Order model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('instanceMethods', () => {
        let codyorder;
        let codysmith;
        let codyaddress;

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
                    })
                })  
            })
        })

        describe('fields', () => {
        it('has a status, addressId, and userId', () => {
            expect(codyorder.status).to.be.equal('open')
            expect(codyorder.addressId).to.be.equal(1)
            expect(codyorder.userId).to.be.equal(1)
        })
        })
    })
})