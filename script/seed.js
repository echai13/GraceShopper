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
    Category.create({ name: 'Modular' }),
    Category.create({ name: 'Anthropomorphic' }),
    Category.create({ name: 'Spherical' }),
    Category.create({ name: 'Young' }),
    Category.create({ name: 'Helper' }),
    Category.create({ name: 'Cute' }),
    Category.create({ name: 'Powerful' }),
    Category.create({ name: 'Multiple'}),
    Category.create({ name: 'Miscellaneous' })
  ])

  console.log(`seeded ${categories.length} categories`)

  const products = await Promise.all([
    Product.create({
    name: "Dual Republic of Robots",
    image: "www.buyourobot.com/wp-content/uploads/2016/08/ikar_republic_of_robots_2.png", 
    price: "5.05", 
    description: "They come as a pair! Anarchic bottom and Republic top, if you say Marco Polo, both will respond to you. Beware. If you say just Marco, the top of the pair will respond, and Polo will go wild, and we don't want that. No we don't. While Marco plays well with others and Polo plays badly with others, as a borg-pair, they will remain rather aloof from other borg pets. However, they are practically codependent, and will not do well if separation is forced.", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[7], categories[1], categories[8]])),
    Product.create({
    name: "Digitwo",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/DGII-circle.png", 
    price: "5.05", 
    description: "She enjoys playing the bagpipes in her free time, and regularly adds different forms of music to her body. Last month she added a harmonica to her wheeled feet. She is very responsive to noise levels, and will know when it is time to liven up the room. If she learns you have a preferred style of music, she will tinker with her hardware to create that instrument for you. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[5], categories[8]])),
    Product.create({
    name: "Topple",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/cheburashka.png", 
    price: "5.05", 
    description: "Topple, also known as Cheburashka, was named for his fascination with all roly poly toys and his namesakes cartoons. He appended little wooden donuts to the side of his head to emulate cheburashkas elephant ears, and enjoys toppling off surfaces close to the ground. Topple plays well with other borg pets that are top heavy, and often encourages the borgs around him to perform tumbling exercises and re-enactments of old russian cartoons. He will become attached to any alligator type animal. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[5], categories[1]])),
    Product.create({
    name: "Pup88",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/retro-pups.png", 
    price: "5.05", 
    description: "Pup88's eyes are always wide with wonder, and they look at you as though your are the most important person in the world. They give Nuzzles as they get closer to you, and will often lean on you as they get tired. Pup is one of our baby pets, and when picked up, requires head support, or they will be in extreme pain. Does well when paired with Dandiga borgs. Does not play well with Topple, as the head support is so weak that he will not be able to participate in activities. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Dandiga",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/retro-daddy.png", 
    price: "5.05", 
    description: "Dandiga, or Dandy, is an ideal caretaker pet, and will take on small chores that he deems his owner as too tired to do. However, he dislikes wet surfaces and spills, so shies away from kitchens and bathrooms if recently used. However, he loves to play with kids and pets, and is a suitable toy dog walker. He also plays well with other borg pets, and assumes the caretaker role in a large group of borgs. Dandiga also makes for a good alarm bot, and a task reminder. But his persistence in reminding you to finish your tasks is...meh.", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[8]])),
    Product.create({
    name: "Byno",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/look-see-retro.png", 
    price: "5.05", 
    description: "Bynos classify themselves as extreme optimists, and they often ding happily in the morning as they come out of their recharging cycle. Byno is double jointed, and is capable of very complicated tasks with his hands, however, he can get overexcited, and has to run down his energy before doing a task requiring great concentration. He is known as one of our most affectionate borgs, and they have been known to self-shutdown if they are abused. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[5]])),
    Product.create({
    name: "Boxer",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/retro-robotoy.png", 
    price: "5.05", 
    description: "Boxer units came from the streets, and self assembled into the small pods they used to reside in. This particular unit likes to recycle tech waste into boxes, and will ingest old and unused computers and output beautiful green and silver cubes. Perfect for the budding artist or family who would like to play with cubes. Once he gets closer to you, he will also try to make shapes you find aesthetically pleasing, as long as they are modular shapes. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Cyder",
    image: "www.buyourobot.com/wp-content/uploads/2017/02/retro-pirate.png", 
    price: "5.05", 
    description: "Cyder the cyclops is a booming unisex robot, and often amplifies music or speech heard around it. They will require a week or two of training to know which voices to amplify and when to shut down speaker functions. WHen cyder is extremely happy, it will amplify previously heard music that it found pleasing, which tend towards wood instruments( flute, lute, etc ). Cyder is very low maintenance, and can go for a long time without directed attention, but it will boom out sad breakup music if left alone for too long. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Toddy",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/toddler-category.png", 
    price: "5.05", 
    description: "Toddy the toddler is an infant borg, and will grow as large as the adopting family wants her to grow. She has bad depth perception and will take a few months to grow accustomed ot her host family, and to learn what they look like and identify them from a mass of shapes. Toddy is essentially a blank slate, and has yet to exhibit any stable characteristics that come with the unit. Nature versus Nurture is a super fun thing to see as Toddy grows up. Potential owners will go through a home screening before final delivery is confirmed. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Raphael",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/turtle-bot.png", 
    price: "5.05", 
    description: "Raphael is your typical teenage mutant ninja turtle emulator borg, and can be a little moody at times. However, the loyalty innate to this borg is incredibly high, and will persist throughout his and his owner's lifetime. Raphael is also a very good monitor and companion borg. He is one of the first of the borgs of his kind to develop defensive and offensive actions, and is very good at fending off battery and assault. He also likes to experiment with new outer casing, and aspires to be bulletproof. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Chip",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/looksee-robot.png", 
    price: "5.05", 
    description: "Chip is the slightly more cynical version of the Byno borgs, and often displays a more logical outlook on life with her owner. Chip's lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Bensta",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/police-bot.png", 
    price: "5.05", 
    description: "Ben Stapler is one of the borgs with a first and last name, as this robot is one of the few borgs that wish to integrate into the human society rather than play with borgs. He is a highly analytical thinker, and will often spend his free time doing battle drills. Arms proficiency develops within two weeks with this unit, and he makes an ideal addition to a police task force, specifically S.W.A.T and F.D.A. teams. While he is highly independent and doesn't rely on his owners, he will leave them goodbye messages during every raid. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Medibae",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/medic-bot-1.png", 
    price: "5.05", 
    description: "The medic borg Joy Maxima is fully matured at outset, and wants to fully integrate into human society. She has a high emotional quotient, and is also highly analytical. She has medical and veterinary textbooks already downloaded into her knowledge bank, and is always looking for the newest journals and books to import. Her double jointed hands have a steel backing, and are very stable for sensitive procedures. She is also able to radiate electrical pulses down her fingers into small expandable pads, to make for a makeshift heart defibrillator. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Hopper",
    image: "www.buyourobot.com/wp-content/uploads/2015/11/unit-9_2.png", 
    price: "5.05", 
    description: "Hopper self classifies as a jolly old fellow, and when his eyes aren't in their happy crescent form, they are wide open and crinkled with manufactured smile lines. He gives hugs as his default greeting, and when not provided with the owners upper body, will often hug his owner's leg as a koala does. It is alost impossible to disappoint Hopper, but what will make him angry is seeing people not recycle and litter. He fancies himself a bit of an ecologist, and when he gets angry...watch out.", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Aang",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/air-bot.png", 
    price: "5.05", 
    description: "Aang the air borg has hover capabilities, and you will never find her under pad touching the ground unless she's recharging or depressed. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, Aang has enormous procesing power, and can perform complex equations, when she's not playing, of course. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "The Fantastic UFO6",
    image: "www.buyourobot.com/wp-content/uploads/2017/04/ufo-robotic-family.png", 
    price: "5.05", 
    description: "This super bot family comes as a pod of six, and will not be separated. However, their capabilities far exceed the charging energy and upkeep that they'll require. The UFO6 are called, from left to right, Gamma, Beta, Delta, Alpha, Lambda, and Omega. The youngest, Omega, is considered a bit of a prodigy, and can specialize in whatever the owning family decides is most needed at the moment. Each of the six specialize in things ranging from cooking, tech, security, companionship, and entertainment. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[7], categories[5]])),
    Product.create({
    name: "Groot",
    image: "www.buyourobot.com/wp-content/uploads/2017/04/ufo-beetle-robot.png", 
    price: "5.05", 
    description: "Groot, your friendly beetle borg, is one of the line of borgs capable of physical growth, as well as mental growth. Similar to the training game Portal, Groot would be able to go through different chambers of the game, and similarly get better at passing them. Groot has complex heuristic mechanisms, and is able to learn how to speak a different language, how to use slang and abbreviations and contractions if given a few ,months of learning time. Groots speech pattern is able to almost fully recreate a normal humans speech pattern. He can also rap. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Felix",
    image: "www.buyourobot.com/wp-content/uploads/2017/05/turbot.png", 
    price: "5.05", 
    description: "Felix is your typical feline spherical borg, and enjoys observing her surroundings, rolling around and trying to find her antennae, and will change her outer shells cover depending on her mood or the weather outside. When chasing other borgs or natural animals, she will rev her engines, and roll to ramp her speed up as quickly as possible. Felix can get bruised rather easily, but she has self buffing systems to regularly perform upkeep on her exterior shell. And she has nine lives, and can survive minor crashes with relative ease compared to other borgs. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])), 
    Product.create({
    name: "Tasket",
    image: "www.buyourobot.com/wp-content/uploads/2017/05/kilo-bot.png", 
    price: "5.05", 
    description: "Tim the basket borg, is a bit of a hoarder. He will go around the house collecting fallen toys, wrappers, clothes and horde them in sorted clusters in his partitioned upper body. He will regurgitate them on cue, making him ideal for new families and messy bachelors/bachelorettes. ", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Togepod",
    image: "www.buyourobot.com/wp-content/uploads/2015/11/cyber-egg.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Cutan",
    image: "www.buyourobot.com/wp-content/uploads/2016/09/cutan.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[5], categories[3]])),
    Product.create({
    name: "Digger",
    image: "www.buyourobot.com/wp-content/uploads/2016/09/big-head-robot3.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[7]])),
    Product.create({
    name: "Rolo",
    image: "www.buyourobot.com/wp-content/uploads/2016/10/roller_bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Steel",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/steel-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "ETBotter",
    image: "www.buyourobot.com/wp-content/uploads/2016/11/ufo-robot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "NightCrawler",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/robotic-spider.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Al"
    ,image: "www.buyourobot.com/wp-content/uploads/2015/11/alien-robot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "BB-Bot",
    image: "www.buyourobot.com/wp-content/uploads/2017/01/Bbot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Protarn",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/pr-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Uniqlo",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/unique-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Circadia",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/circle-robot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Sectoid",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/bee-robot-revival.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bumblebee",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/bee-robot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Milo",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/mailo2.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Arsen",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/assistant-bot2.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Boto",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/boto.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bones",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/bone-slim-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Dante",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/ant-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Vitriol",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/virus.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bobbi",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/plate-bot.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Patreon",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/unit-5.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Barricade",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/oculus-long-headed.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Andromeda",
    image: "www.buyourobot.com/wp-content/uploads/2015/10/oculus.png", 
    price: "5.05", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", 
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
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
    Address.create({  street1: ' 55 East 117th Street', street2: ' Apt 2    ', city: 'New York', state: 'NY', country: 'USA', zipcode: 10035, userId: 4 })
  ])

  console.log(`seeded ${addresses.length} addresses`)

  const orders = await Promise.all([
    Order.create({ status: 'completed', userId: 1, addressId: 1 }),
    Order.create({ status: 'open', userId: 1, addressId: 1 }),
    Order.create({ status: 'completed', userId: 1, addressId: 1 }),
    Order.create({ status: 'completed', userId: 2, addressId: 1 }),
    Order.create({ status: 'open', userId: 2, addressId: 1 }),
    Order.create({ status: 'completed', userId: 2, addressId: 1 }),
    Order.create({ status: 'completed', userId: 3, addressId: 1 }),
    Order.create({ status: 'open', userId: 3, addressId: 1 }),
    Order.create({ status: 'completed', userId: 3, addressId: 1 }),
    Order.create({ status: 'shipped', userId: 4, addressId: 3 })
  ])

  console.log(`seeded ${orders.length} orders`)

  const orderitems = await Promise.all([
    OrderItem.create({ quantity: 1, currentPrice: 5.05 , productId: 1, orderId: 1 }),
    OrderItem.create({ quantity: 3, currentPrice: 5.05 , productId: 3, orderId: 1 }),
    OrderItem.create({ quantity: 2, currentPrice: 5.05 , productId: 4, orderId: 2 }),
    OrderItem.create({ quantity: 5, currentPrice: 5.05 , productId: 6, orderId: 2 }),
    OrderItem.create({ quantity: 8, currentPrice: 5.05 , productId: 5, orderId: 2 }),
    OrderItem.create({ quantity: 4, currentPrice: 5.05 , productId: 7, orderId: 3 }),
    OrderItem.create({ quantity: 3, currentPrice: 5.05 , productId: 8, orderId: 3 }),
    OrderItem.create({ quantity: 4, currentPrice: 5.05 , productId: 12, orderId: 3 }),
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
