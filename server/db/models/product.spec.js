
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const Category = db.model('category');

describe('Product model', () => {
  const borgpet007 = {
    name: 'roselia007',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1.45',
    description: 'flowery but techy bundle of cuteness',
    stock: 10,
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }

  const noStock = {
    name: 'nope',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1000.00',
    description: 'flowery but techy bundle of cuteness',
    stock: 0,
    reviews: [ 'needs no sunlight! woot!', 'love her foreva']
  }

  before(() => {
    return db.sync({ force: true });
  })

  let pet, zeroPet, categoryOne, categoryTwo;

  beforeEach( async () => {
    await db.sync({force: true});
    pet = await Product.create(borgpet007);
    zeroPet = await Product.create(noStock);
    categoryOne = await Category.create({name: 'plant-type'});
    categoryTwo = await Category.create({ name: 'water-type' });
    await pet.setCategories([categoryOne, categoryTwo]);
    await zeroPet.addCategory(categoryOne);
  })

  //what should be in our models

  it('has name, image, price, description, stock, cat, and reviews', async () => {
    const categories = await pet.getCategories();
  	expect(pet).to.have.property('name', borgpet007.name)
  	expect(pet).to.have.property('image', borgpet007.image)
  	expect(pet).to.have.property('price', borgpet007.price)
  	expect(pet).to.have.property('description', borgpet007.description)
    expect(pet).to.have.property('stock', borgpet007.stock)
    expect(pet).to.have.property('isAvailable', true)
    expect(pet.reviews).to.have.lengthOf(2)
    expect(categories).to.have.lengthOf(2);
    expect(categories[0]).to.have.property('name', 'plant-type');
  })

  it('updates stock and sets to zero, also sets isAvailable to false', async () => {
        const updatedPet = await pet.update({stock: 0});
        expect(updatedPet).to.have.property('isAvailable', false)
        expect(updatedPet).to.have.property('stock', 0)
        expect(updatedPet).to.have.property('name', borgpet007.name)
        expect(updatedPet).to.have.property('price', borgpet007.price)
  })

  it('when creating a product with zero stock, hook sets isAvailable to false', async () => {
    const categories = await zeroPet.getCategories();
    expect(zeroPet).to.have.property('isAvailable', false)
    expect(zeroPet).to.have.property('stock', 0)
    expect(zeroPet).to.have.property('name', noStock.name)
    expect(zeroPet).to.have.property('price', noStock.price)
    expect(categories).to.have.lengthOf(1);
    expect(categories[0]).to.have.property('name', 'plant-type');
  })

  it('can have categories removed from the product', async () => {
    await pet.removeCategory(categoryOne);
    const categories = await pet.getCategories();
    expect(categories).to.have.lengthOf(1);
    expect(categories[0]).to.have.property('name', 'water-type');
  })
}) // end describe('Product model')
