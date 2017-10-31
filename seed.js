const db = require('./server/db');
const Product = require('./server/db/models/product');

const products = [{
	name: 'ferret007',
	image: 'https://i.pinimg.com/564x/bd/6f/b9/bd6fb9698229c202b7a8bd28a32188fe.jpg',
	price: '5.45',
	description: 'scrappy but techy bundle of cuteness',
	stock: 10,
	category: 'rodent-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {
	name: 'styracosaurus',
	image: 'https://i.pinimg.com/564x/80/ca/6b/80ca6b06e6466a98bb547ce54a37ee55.jpg',
	price: '1.45',
	description: 'flowery but techy bundle of cuteness',
	stock: 10,
	category: 'plant-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {
	name: 'prongs020',
	image: 'https://i.pinimg.com/564x/fd/9f/56/fd9f564d84722c5305f8a5738266612a.jpg',
	price: '100.85',
	description: 'elegant and mysterious',
	stock: 10,
	category: 'forest-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {
	name: 'seahorn001',
	image: 'https://i.pinimg.com/564x/ee/41/e5/ee41e5229b8d4ee6ffa32855b300f8bc.jpg',
	price: '100.85',
	description: 'super cute seahorse',
	stock: 10,
	category: 'water-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {
	name: '',
	image: '',
	price: '100.85',
	description: 'elegant and mysterious',
	stock: 10,
	category: 'forest-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {
	name: '',
	image: '',
	price: '100.85',
	description: 'elegant and mysterious',
	stock: 10,
	category: 'forest-type',
	reviews: [ 'needs no sunlight! woot!' , 'love her foreva']
}, {

}];


// const seed = () =>
//   Promise.all(authors.map(author =>
//     Author.create(author))
//   )
//   .then(() =>
//   Promise.all(channels.map(channel =>
//     Channel.create(channel))
//   ))
//   .then(() =>
//   Promise.all(messages.map(message =>
//     Message.create(message))
//   )
// );

// const main = () => {
//   console.log('Syncing db...');
//   db.sync({ force: true })
//     .then(() => {
//       console.log('Seeding databse...');
//       return seed();
//     })
//     .catch(err => {
//       console.log('Error while seeding');
//       console.log(err.stack);
//     })
//     .then(() => {
//       db.close();
//       return null;
//     });
// };

// main();
