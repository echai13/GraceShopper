/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products/', () => {

    beforeEach( async () => {
      const categoryOne = await Category.create({ name: 'plant-type' });
      const categoryTwo = await Category.create({ name: 'water-type' });
      const productTest = await Product.create({
        name: 'Cody',
        price: '1.45',
        description: 'cody is a good puppy'
      })
      await productTest.setCategories([categoryOne,categoryTwo]);
    })

    it('GET /api/products including categories', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('Cody')
          expect(res.body[0].categories).to.have.lengthOf(2);
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
