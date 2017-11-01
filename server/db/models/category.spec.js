
const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')
const Product = db.model('product')


describe('Category model', () => {

  const borgpet007 = {
    name: 'roselia007',
    image: 'https://i.pinimg.com/736x/42/3c/cc/423ccc739f8945284f724182505da80a.jpg',
    price: '1.45',
    description: 'flowery but techy bundle of cuteness',
    stock: 10,
    category: ['plant-type'],
    reviews: ['needs no sunlight! woot!', 'love her foreva']
  }

  beforeEach(() => {
    return db.sync({ force: true });
  })

  //what should be in our models

  it('holds the category name in the model ', async () => {
    const category = await Category.create({name: 'plant-type'});
    expect(category).to.have.property('name', 'plant-type');
  })

  it('can be added to a product via addCategory', async () => {
    const category = await Category.create({ name: 'plant-type' });
    const pet = await Product.create(borgpet007)
    .then(borg => {
      return borg.addCategory(category)
        .then( () => borg);
    })
    const categories = await pet.getCategories();
    expect(categories[0]).to.have.property('name', 'plant-type');

  })
}) // end describe('Product model')
