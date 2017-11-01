const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')
const User = db.model('user')

describe('Review model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('instanceMethods', () => {
        let codyreview;
        let codysmith;

        beforeEach(() => {
            return User.create({
                firstName: 'Cody',
                lastName: 'Smith',
                email: 'bob@smith.com',
                password: 'hello'
            })
            .then(user => {
                codysmith = user;

                return Review.create({
                    title: 'best pet ever',
                    text: 'i love my hamster',
                    stars: 'five'
                })
                .then(review => {
                    codyreview = review;
                })  
            })
        })

        describe('fields', () => {
            it('has a title, text, and stars', () => {
                expect(codyreview.title).to.be.equal('best pet ever')
                expect(codyreview.text).to.be.equal('i love my hamster')
                expect(codyreview.stars).to.be.equal('five')
            })
        })
    })
})