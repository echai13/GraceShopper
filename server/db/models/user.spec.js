/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Smith',
        email: 'cody@puppybook.com',
        isAdmin: false,
        password: 'bones'
      })
        .then(user => {
          cody = user
        })
    })
      
    describe('correctPassword', () => {

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('fields', () => {
      it('has firstName, lastName, email, isAdmin', () => {
        expect(cody.firstName).to.be.equal('Cody')
        expect(cody.lastName).to.be.equal('Smith')
        expect(cody.email).to.be.equal('cody@puppybook.com')
        expect(cody.isAdmin).to.be.equal(false)
      })
    })

    describe('getter method', () => {
      it('gets first and last name', () => {
        expect(cody.fullName).to.be.equal('Cody Smith')
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
