/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, OrderItem, Address, Category, Order} = require('../server/db/models')


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const categories = await Promise.all([
    Category.create({ name: 'forest' }),
    Category.create({ name: 'sea' }),
    Category.create({ name: 'water' }),
    Category.create({ name: 'rodent' }),
    Category.create({ name: 'domestic' }),
    Category.create({ name: 'small' }),
    Category.create({ name: 'powerful' }),
    Category.create({ name: 'miscellaneous' })
  ])

  console.log(`seeded ${categories.length} categories`)

  const products = await Promise.all([
    Product.create({ name: 'ferret007', image: 'https://i.pinimg.com/564x/bd/6f/b9/bd6fb9698229c202b7a8bd28a32188fe.jpg', price: '5.45', description: 'scrappy but techy bundle of cuteness', stock: 20 })
      .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({ name: 'prongs020', image: 'https://i.pinimg.com/564x/fd/9f/56/fd9f564d84722c5305f8a5738266612a.jpg', price: '100.85', description: 'elegant and mysterious', stock: 8 })
      .then(product => product.setCategories(categories[0])),
    Product.create({  name: 'styracosaurus808', image: 'https://i.pinimg.com/564x/80/ca/6b/80ca6b06e6466a98bb547ce54a37ee55.jpg', price: '1.45', description: 'huge but affectionate', stock: 5 })
      .then(product => product.setCategories([categories[0], categories[6]])),
    Product.create({ name: 'seahorn001', image: 'https://i.pinimg.com/564x/ee/41/e5/ee41e5229b8d4ee6ffa32855b300f8bc.jpg', price: '100.85', description: 'super cute seahorse', stock: 100 })
      .then(product => product.setCategories([categories[2], categories[1], categories[5]])),
    Product.create({ name: 'panda009', image: 'https://i.pinimg.com/564x/08/76/97/0876971e4d276a9af89770143f09a571.jpg', price: '590.25', description: 'fierce, and a little uncoordinated, panda', stock: 2 })
      .then(product => product.setCategories([categories[0], categories[6]])),
    Product.create({ name: 'griffin105', image: 'https://i.pinimg.com/564x/b7/18/c5/b718c5588898ae54b0906c3f2506dec3.jpg', price: '85.10', description: 'with metal feathers that can slice anything to pieces', stock: 20 })
      .then(product => product.setCategories(categories[6])),
    Product.create({ name: 'sabertooth072', image: 'https://i.pinimg.com/564x/51/07/d2/5107d248d92627a019ef6916772b8de0.jpg', price: '1000.00', description: 'they are real and you can ride them', stock: 5 })
      .then(product => product.setCategories([categories[7], categories[0]])),
    Product.create({ name: 'robopup792', image: 'https://i.pinimg.com/564x/79/b6/d0/79b6d092d293d89392491b76b2bf3cd6.jpg', price: '52.75', description: 'the cutest puppy you will ever see', stock: 18 })
      .then(product => product.setCategories([categories[7], categories[5], categories[4]])),
    Product.create({ name: 'hummingbird047', image: 'https://www.pinterest.com/pin/800092690020949611/', price: '22.50', description: 'they never stop moving!', stock: 10 })
      .then(product => product.setCategories([categories[7], categories[5]])),
    Product.create({ name: 'kangaroo000', image: 'https://i.pinimg.com/564x/a7/96/96/a796966459113054726f2b1636492fe4.jpg', price: '47.01', description: 'hop hop hop hop smash', stock: 7 })
      .then(product => product.setCategories(categories[6])),
      //
  ])
  console.log(`seeded ${products.length} products`)

  const users = await Promise.all([
    User.create({ firstName: ' Moyouri', lastName: 'Bhattacharjee', email: 'momo@gmail.com', isAdmin: true, password: 'DjangoCoder' }),
    User.create({ firstName: ' Erica', lastName: 'Chai', email: 'echai@gmail.com', isAdmin: true, password: 'DjangoCoderb' }),
    User.create({ firstName: ' Sam', lastName: 'Zhang', email: 'szhang@gmail.com', isAdmin: true, password: 'DjangoCoderc' }),
    User.create({ firstName: ' Caryn', lastName: 'McCarthy', email: 'CMcCarthy@gmail.com', isAdmin: true, password: 'DjangoCoderd' }),
    User.create({ firstName: ' Victor', lastName: 'Bhattacharjee', email: 'vbhattac@gmail.com', isAdmin: false, password: 'DjangoCodernever' })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const addresses = await Promise.all([
    Address.create({  street1: ' 88-14 170th street ', city: 'Jamaica', state: 'NY', country: 'USA', zipcode: 11432, userId: 1 }),
    Address.create({  street1: ' 104-14 Liverpool Ave   ', street2:  ' 1st Floor Apt 1M    ', city: 'Union', state: 'NJ', country: 'USA', zipcode: 10016, userId: 5 }),
    Address.create({ street1: ' 55 East 117th Street', street2: ' Apt 2    ', city: 'New York', state: 'NY', country: 'USA', zipcode: 10035, userId: 4 })
  ])

  console.log(`seeded ${addresses.length} addresses`)

  const orders = await Promise.all([
    Order.create({ status: 'completed', userId: 1, addressId: 1 }),
    Order.create({ status: 'open', userId: 1, addressId: 1 }),
    Order.create({ status: 'shipped', userId: 4, addressId: 3 })
  ])

  console.log(`seeded ${orders.length} orders`)

  const orderitems = await Promise.all([
    OrderItem.create({ quantity: 1, currentPrice: 5.45, productId: 1, orderId: 1 }),
    OrderItem.create({ quantity: 3, currentPrice: 1.45, productId: 3,  orderId: 1 }),
    OrderItem.create({ quantity: 2, currentPrice: 5.45, productId: 1, orderId: 2 }),
    OrderItem.create({ quantity: 5, currentPrice: 100.85, productId: 2, orderId: 2 }),
    OrderItem.create({ quantity: 8, currentPrice: 1.45, productId: 3, orderId: 2 }),
    OrderItem.create({ quantity: 4, currentPrice: 100.85, productId: 4, orderId: 3 }),
  ])

  console.log(`seeded ${orderitems.length} orderitems`)
  console.log(`seeded successfully`)

}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
