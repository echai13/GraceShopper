/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let address1

    beforeEach(() => {
      return Address.create({
        street1: '123 Apple Ln',
        city: 'Apple City',
        state: 'NY',
        country: 'USA',
        zipcode: 10010
      })
        .then(address => {
          address1 = address
        })
    })

    describe('fields', () => {
      it('has street1, city, state, country, zipcode', () => {
        expect(address1.street1).to.be.equal('123 Apple Ln')
        expect(address1.city).to.be.equal('Apple City')
        expect(address1.state).to.be.equal('NY')
        expect(address1.country).to.be.equal('USA')
        expect(address1.zipcode).to.be.equal(10010)
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')