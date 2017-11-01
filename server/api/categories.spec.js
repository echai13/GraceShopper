/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/categories/', () => {

    beforeEach(async () => {
      const categoryOne = await Category.create({ name: 'plant-type' });
      const categoryTwo = await Category.create({ name: 'water-type' });
    })

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0].name).to.be.equal('plant-type')
          expect(res.body[1].name).to.be.equal('water-type')

        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
