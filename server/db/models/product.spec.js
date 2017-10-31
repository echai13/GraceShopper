
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')


describe('Product model', () => {
  const borgpet007 = {
    name: 'roselia007',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1.45',
    description: 'flowery but techy bundle of cuteness',
    stock: 10,
    category: ['plant-type'],
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }

  const noStock = {
    name: 'nope',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1000.00',
    description: 'flowery but techy bundle of cuteness',
    stock: 0,
    category: ['plant-type'],
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }

  beforeEach( () => {
    return db.sync({force: true});
  })

  //what should be in our models

  it('has name, image, price, description, stock, cat, and reviews', async () => {
  	const pet = await Product.create(borgpet007);
  	expect(pet).to.have.property('name', borgpet007.name)
  	expect(pet).to.have.property('image', borgpet007.image)
  	expect(pet).to.have.property('price', borgpet007.price)
  	expect(pet).to.have.property('description', borgpet007.description)
    expect(pet).to.have.property('stock', borgpet007.stock)
    expect(pet).to.have.property('isAvailable', true)
  	expect(pet.category[0]).to.equal('plant-type')
    expect(pet.reviews).to.have.lengthOf(2)
  })

  it('updates stock and sets to zero, also sets isAvailable to false', async () => {
        const pet = await Product.create(borgpet007)
          .then(product => product.update({stock: 0}));
        expect(pet).to.have.property('isAvailable', false)
        expect(pet).to.have.property('stock', 0)
        expect(pet).to.have.property('name', borgpet007.name)
        expect(pet).to.have.property('price', borgpet007.price)
  })

  it('when creating a product with zero stock, hook sets isAvailable to false', async () => {
    const pet = await Product.create(noStock)
      .then(product => product.update({stock: 0}));
    expect(pet).to.have.property('isAvailable', false)
    expect(pet).to.have.property('stock', 0)
    expect(pet).to.have.property('name', noStock.name)
    expect(pet).to.have.property('price', noStock.price)
})
}) // end describe('Product model')
