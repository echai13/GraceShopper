
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')


describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //what should be in our models

  it('has name, image, price, description, stock, cat, and reviews', async () => {
  	const borgpet007 = { 
  		name: 'roselia007',
  		image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
  		price: '1.45',
  		description: 'flowery but techy bundle of cuteness',
  		stock: 10,
  		category: 'plant-type',
  		reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
  	} 
  	const pet = await Product.create(borgpet007)
  	expect(pet).to.have.property('name', borgpet007.name)
  	expect(pet).to.have.property('image', borgpet007.image)
  	expect(pet).to.have.property('price', borgpet007.price)
  	expect(pet).to.have.property('description', borgpet007.description)
  	expect(pet).to.have.property('stock', borgpet007.stock)
  	expect(pet).to.have.property('category', borgpet007.category)
  	expect(pet.reviews).to.have.lengthOf(2)
  })
}) // end describe('Product model')
