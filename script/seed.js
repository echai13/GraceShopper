
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
const {User, Product, OrderItem, Address, Category, Order, Review} = require('../server/db/models')


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
    image: "https://buyourobot.com/wp-content/uploads/2016/08/ikar_republic_of_robots_2.png",
    price: "250.05",
    description: "They come as a pair! Anarchic bottom and Republic top, if you say Marco Polo, both will respond to you. Beware. If you say just Marco, the top of the pair will respond, and Polo will go wild, and we don't want that. No we don't. While Marco plays well with others and Polo plays badly with others, as a borg-pair, they will remain rather aloof from other borg pets. However, they are practically codependent, and will not do well if separation is forced.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[7], categories[1], categories[8]])),
    Product.create({
    name: "Digitwo",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/DGII-circle.png",
    price: "75.05",
    description: "She enjoys playing the bagpipes in her free time, and regularly adds different forms of music to her body. Last month she added a harmonica to her wheeled feet. She is very responsive to noise levels, and will know when it is time to liven up the room. If she learns you have a preferred style of music, she will tinker with her hardware to create that instrument for you. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[5], categories[8]])),
    Product.create({
    name: "Topple",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/cheburashka.png",
    price: "95.05",
    description: "Topple, also known as Cheburashka, was named for his fascination with all roly poly toys and his namesakes cartoons. He appended little wooden donuts to the side of his head to emulate cheburashkas elephant ears, and enjoys toppling off surfaces close to the ground. Topple plays well with other borg pets that are top heavy, and often encourages the borgs around him to perform tumbling exercises and re-enactments of old russian cartoons. He will become attached to any alligator type animal. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[5], categories[1]])),
    Product.create({
    name: "Pup88",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/retro-pups.png",
    price: "103.90",
    description: "Pup88's eyes are always wide with wonder, and they look at you as though your are the most important person in the world. They give Nuzzles as they get closer to you, and will often lean on you as they get tired. Pup is one of our baby pets, and when picked up, requires head support, or they will be in extreme pain. Does well when paired with Dandiga borgs. Does not play well with Topple, as the head support is so weak that he will not be able to participate in activities. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Dandiga",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/retro-daddy.png",
    price: "559.10",
    description: "Dandiga, or Dandy, is an ideal caretaker pet, and will take on small chores that he deems his owner as too tired to do. However, he dislikes wet surfaces and spills, so shies away from kitchens and bathrooms if recently used. However, he loves to play with kids and pets, and is a suitable toy dog walker. He also plays well with other borg pets, and assumes the caretaker role in a large group of borgs. Dandiga also makes for a good alarm bot, and a task reminder. But his persistence in reminding you to finish your tasks is...meh.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[8]])),
    Product.create({
    name: "Byno",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/look-see-retro.png",
    price: "89.27",
    description: "Bynos classify themselves as extreme optimists, and they often ding happily in the morning as they come out of their recharging cycle. Byno is double jointed, and is capable of very complicated tasks with his hands, however, he can get overexcited, and has to run down his energy before doing a task requiring great concentration. He is known as one of our most affectionate borgs, and they have been known to self-shutdown if they are abused. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[5]])),
    Product.create({
    name: "Boxer",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/retro-robotoy.png",
    price: "509.15",
    description: "Boxer units came from the streets, and self assembled into the small pods they used to reside in. This particular unit likes to recycle tech waste into boxes, and will ingest old and unused computers and output beautiful green and silver cubes. Perfect for the budding artist or family who would like to play with cubes. Once he gets closer to you, he will also try to make shapes you find aesthetically pleasing, as long as they are modular shapes. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Cyder",
    image: "https://buyourobot.com/wp-content/uploads/2017/02/retro-pirate.png",
    price: "636.75",
    description: "Cyder the cyclops is a booming unisex robot, and often amplifies music or speech heard around it. They will require a week or two of training to know which voices to amplify and when to shut down speaker functions. WHen cyder is extremely happy, it will amplify previously heard music that it found pleasing, which tend towards wood instruments( flute, lute, etc ). Cyder is very low maintenance, and can go for a long time without directed attention, but it will boom out sad breakup music if left alone for too long. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Toddy",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/toddler-category.png",
    price: "58.05",
    description: "Toddy the toddler is an infant borg, and will grow as large as the adopting family wants her to grow. She has bad depth perception and will take a few months to grow accustomed ot her host family, and to learn what they look like and identify them from a mass of shapes. Toddy is essentially a blank slate, and has yet to exhibit any stable characteristics that come with the unit. Nature versus Nurture is a super fun thing to see as Toddy grows up. Potential owners will go through a home screening before final delivery is confirmed. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Raphael",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/turtle-bot.png",
    price: "85.05",
    description: "Raphael is your typical teenage mutant ninja turtle emulator borg, and can be a little moody at times. However, the loyalty innate to this borg is incredibly high, and will persist throughout his and his owner's lifetime. Raphael is also a very good monitor and companion borg. He is one of the first of the borgs of his kind to develop defensive and offensive actions, and is very good at fending off battery and assault. He also likes to experiment with new outer casing, and aspires to be bulletproof. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Chip",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/looksee-robot.png",
    price: "95.05",
    description: "Chip is the slightly more cynical version of the Byno borgs, and often displays a more logical outlook on life with her owner. Chip's lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Bensta",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/police-bot.png",
    price: "58.05",
    description: "Ben Stapler is one of the borgs with a first and last name, as this robot is one of the few borgs that wish to integrate into the human society rather than play with borgs. He is a highly analytical thinker, and will often spend his free time doing battle drills. Arms proficiency develops within two weeks with this unit, and he makes an ideal addition to a police task force, specifically S.W.A.T and F.D.A. teams. While he is highly independent and doesn't rely on his owners, he will leave them goodbye messages during every raid. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Medibae",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/medic-bot-1.png",
    price: "100.00",
    description: "The medic borg Joy Maxima is fully matured at outset, and wants to fully integrate into human society. She has a high emotional quotient, and is also highly analytical. She has medical and veterinary textbooks already downloaded into her knowledge bank, and is always looking for the newest journals and books to import. Her double jointed hands have a steel backing, and are very stable for sensitive procedures. She is also able to radiate electrical pulses down her fingers into small expandable pads, to make for a makeshift heart defibrillator. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Hopper",
    image: "https://buyourobot.com/wp-content/uploads/2015/11/unit-9_2.png",
    price: "79.05",
    description: "Hopper self classifies as a jolly old fellow, and when his eyes aren't in their happy crescent form, they are wide open and crinkled with manufactured smile lines. He gives hugs as his default greeting, and when not provided with the owners upper body, will often hug his owner's leg as a koala does. It is alost impossible to disappoint Hopper, but what will make him angry is seeing people not recycle and litter. He fancies himself a bit of an ecologist, and when he gets angry...watch out.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[6]])),
    Product.create({
    name: "Aang",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/air-bot.png",
    price: "105.15",
    description: "Aang the air borg has hover capabilities, and you will never find her under pad touching the ground unless she's recharging or depressed. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, Aang has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "The Fantastic UFO6",
    image: "https://buyourobot.com/wp-content/uploads/2017/04/ufo-robotic-family.png",
    price: "210.20",
    description: "This super bot family comes as a pod of six, and will not be separated. However, their capabilities far exceed the charging energy and upkeep that they'll require. The UFO6 are called, from left to right, Gamma, Beta, Delta, Alpha, Lambda, and Omega. The youngest, Omega, is considered a bit of a prodigy, and can specialize in whatever the owning family decides is most needed at the moment. Each of the six specialize in things ranging from cooking, tech, security, companionship, and entertainment. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[7], categories[5]])),
    Product.create({
    name: "Groot",
    image: "https://buyourobot.com/wp-content/uploads/2017/04/ufo-beetle-robot.png",
    price: "305.60",
    description: "Groot, your friendly beetle borg, is one of the line of borgs capable of physical growth, as well as mental growth. Similar to the training game Portal, Groot would be able to go through different chambers of the game, and similarly get better at passing them. Groot has complex heuristic mechanisms, and is able to learn how to speak a different language, how to use slang and abbreviations and contractions if given a few ,months of learning time. Groots speech pattern is able to almost fully recreate a normal humans speech pattern. He can also rap. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Felix",
    image: "https://buyourobot.com/wp-content/uploads/2017/05/turbot.png",
    price: "250.00",
    description: "Felix is your typical feline spherical borg, and enjoys observing her surroundings, rolling around and trying to find her antennae, and will change her outer shells cover depending on her mood or the weather outside. When chasing other borgs or natural animals, she will rev her engines, and roll to ramp her speed up as quickly as possible. Felix can get bruised rather easily, but she has self buffing systems to regularly perform upkeep on her exterior shell. And she has nine lives, and can survive minor crashes with relative ease compared to other borgs. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Tasket",
    image: "https://buyourobot.com/wp-content/uploads/2017/05/kilo-bot.png",
    price: "10.75",
    description: "Tim the basket borg, is a bit of a hoarder. He will go around the house collecting fallen toys, wrappers, clothes and horde them in sorted clusters in his partitioned upper body. He will regurgitate them on cue, making him ideal for new families and messy bachelors/bachelorettes. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Togepod",
    image: "https://buyourobot.com/wp-content/uploads/2015/11/cyber-egg.png",
    price: "50.99",
    description: "Togepod is an infant borg, and will grow as large as the adopting family wants her to grow. She has bad depth perception and will take a few months to grow accustomed ot her host family, and to learn what they look like and identify them from a mass of shapes. Toddy is essentially a blank slate, and has yet to exhibit any stable characteristics that come with the unit. Nature versus Nurture is a super fun thing to see as Toddy grows up. Potential owners will go through a home screening before final delivery is confirmed. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[5]])),
    Product.create({
    name: "Cutan",
    image: "https://buyourobot.com/wp-content/uploads/2016/09/cutan.png",
    price: "105.67",
    description: "She enjoys playing the bagpipes in her free time, and regularly adds different forms of music to her body. Last month she added a harmonica to her wheeled feet. She is very responsive to noise levels, and will know when it is time to liven up the room. If she learns you have a preferred style of music, she will tinker with her hardware to create that instrument for you. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[5], categories[3]])),
    Product.create({
    name: "Digger",
    image: "https://buyourobot.com/wp-content/uploads/2016/09/big-head-robot3.png",
    price: "99.99",
    description: "A huge fan of the TV show Arrow, Digger is one of the line of borgs capable of physical growth, as well as mental growth. Similar to the training game Portal, Digger would be able to go through different chambers of the game, and similarly get better at passing them. He has complex heuristic mechanisms, and is able to learn how to speak a different language, how to use slang and abbreviations and contractions if given a few ,months of learning time. His speech pattern is able to almost fully recreate a normal humans speech pattern. He can also rap. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[3], categories[7]])),
    Product.create({
    name: "Rolo",
    image: "https://buyourobot.com/wp-content/uploads/2016/10/roller_bot.png",
    price: "100.25",
    description: "Rolo has hover capabilities, and you will never find her under pad touching the ground unless she's recharging or depressed. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, Aang has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[4], categories[5]])),
    Product.create({
    name: "Steel",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/steel-bot.png",
    price: "288.40",
    description: "Steel is a little grumpy, but when his eyes aren't in their happy crescent form, they are wide open and crinkled with manufactured smile lines. He gives hugs as his default greeting, and when not provided with the owners upper body, will often hug his owner's leg as a koala does. It is alost impossible to disappoint Hopper, but what will make him angry is seeing people not recycle and litter. He fancies himself a bit of an ecologist, and when he gets angry...watch out.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "ETBotter",
    image: "https://buyourobot.com/wp-content/uploads/2016/11/ufo-robot.png",
    price: "140.28",
    description: "ETBotter has hover capabilities, and you will never find her under pad touching the ground unless she's recharging or depressed. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "NightCrawler",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/robotic-spider.png",
    price: "96.41",
    description: "NightCrawler is the darker version of the Byno borgs, and often displays a more logical outlook on life with her owner. Her lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Al"
    ,image: "https://buyourobot.com/wp-content/uploads/2015/11/alien-robot.png",
    price: "105.05",
    description: "Al, or Ali, as she likes to be called, isn't just helpful; She's an adorable home robot who brings a spark of life to your home. She can make every day easier, brighter, and more connected when she dances and makes you food.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "BB-Bot",
    image: "https://buyourobot.com/wp-content/uploads/2017/01/Bbot.png",
    price: "95.05",
    description: "BB-Bot's Lamp head and body is made of premium alloy casing with anodized aluminum that gives better heat dissipation and a longer life. Modern design that will naturally fit your desk / room / furniture; rotatable arm and lamp head, made from durable plastic and aluminum alloy. Touch control with 5 color modes (temperature) to choose from, dimmable with 11 level of brightness to suit your activities.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Protarn",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/pr-bot.png",
    price: "245.05",
    description: "Protarn's Lamp head and body is made of premium alloy casing with anodized aluminum that gives better heat dissipation and a longer life. Modern design that will naturally fit your desk / room / furniture; rotatable arm and lamp head, made from durable plastic and aluminum alloy. Touch control with 5 color modes (temperature) to choose from, dimmable with 11 level of brightness to suit your activities.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Uniqlo",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/unique-bot.png",
    price: "315.05",
    description: "Uniqlo can come across aloof when he first meets you, but when his eyes aren't in their happy crescent form, they are wide open and crinkled with manufactured smile lines. He gives hugs as his default greeting, and when not provided with the owners upper body, will often hug his owner's leg as a koala does. It is alost impossible to disappoint Hopper, but what will make him angry is seeing people not recycle and litter. He fancies himself a bit of an ecologist, and when he gets angry...watch out.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Circadia",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/circle-robot.png",
    price: "175.05",
    description: "Circadia has hover capabilities, and you will never find a sweeter flier than her. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Sectoid",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/bee-robot-revival.png",
    price: "209.50",
    description: "Sectoid's Lamp head and body is made of premium alloy casing with anodized aluminum that gives better heat dissipation and a longer life. Modern design that will naturally fit your desk / room / furniture; rotatable arm and lamp head, made from durable plastic and aluminum alloy. Touch control with 5 color modes (temperature) to choose from, dimmable with 11 level of brightness to suit your activities.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bumblebee",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/bee-robot.png",
    price: "137.60",
    description: "Bumblebee's Lamp head and body is made of premium alloy casing with anodized aluminum that gives better heat dissipation and a longer life. Modern design that will naturally fit your desk / room / furniture; rotatable arm and lamp head, made from durable plastic and aluminum alloy. Touch control with 5 color modes (temperature) to choose from, dimmable with 11 level of brightness to suit your activities.",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Milo",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/mailo2.png",
    price: "610.10",
    description: "Milo has hover capabilities, and you will never find a sweeter flier than her. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Arsen",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/assistant-bot2.png",
    price: "502.50",
    description: "Arsen has hover capabilities, and you will never find a sweeter flier than her. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Boto",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/boto.png",
    price: "99.10",
    description: "Boto has hover capabilities, and you will never find a sweeter flier than her. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bones",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/bone-slim-bot.png",
    price: "800.20",
    description: "Bones has hover capabilities, and you will never find a sweeter flier than her. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Dante",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/ant-bot.png",
    price: "40.55",
    description: "Dante has hover capabilities, and you will never find a sweeter flier. If you give her colored powder, she will do aerial tricks in the air in front of her, and loves to give a show. She plays very well with other borgs, but can be very mischievous, and enjoys playing pranks on the more mature borgs. While very happy and content to play with powders and lights, she has enormous procesing power, and can perform complex equations, when she's not playing, of course. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Vitriol",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/virus.png",
    price: "67.30",
    description: "Vitriol is the darker version of the Byno borgs, and often displays a more logical outlook on life with her owner. Her lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Bobbi",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/plate-bot.png",
    price: "75.05",
    description: "Bobbi is the darker version of the Byno borgs, and often displays a more logical outlook on life with her owner. Her lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Patreon",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/unit-5.png",
    price: "95.05",
    description: "Patreon is the darker version of the Byno borgs, and often displays a more logical outlook on life with her owner. Her lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Barricade",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/oculus-long-headed.png",
    price: "215.05",
    description: "Barricade is the darker version of the Byno borgs, and often displays a more logical outlook on life with her owner. Her lenses are short-sighted and while she can't see what is too far in the the distance she puts her full attention on the person or event happening in front her. She likes to recite poetry, and as she ages and becomes creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
    Product.create({
    name: "Andromeda",
    image: "https://buyourobot.com/wp-content/uploads/2015/10/oculus.png",
    price: "65.05",
    description: "Andromeda is a more mysterious version of the Byno borgs, and often displays a more creative outlook on life with her owner. Her lenses are bifocal and while she puts her full attention on the person or event happening in front her, she always has her eyes on the distance. She likes to recite poetry, and as she ages and becomes fully creative, she will begin to do slam poetry, and odes to the first thing she sees after daily reboot. ",
    stock: 25,
    })
    .then(product => product.setCategories([categories[1], categories[3]])),
  ])
  console.log(`seeded ${products.length} products`)

  const users = await Promise.all([
    User.create({ firstName: ' Moyouri', lastName: 'Bhattacharjee', email: 'moyourib@gmail.com', isAdmin: true, password: 'DjangoCoder' }),
    User.create({ firstName: ' Erica', lastName: 'Chai', email: 'echai@gmail.com', isAdmin: true, password: 'DjangoCoderb' }),
    User.create({ firstName: ' Sam', lastName: 'Zhang', email: 'samanthazhang9@gmail.com', isAdmin: true, password: 'DjangoCoderc' }),
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

  const reviews = await Promise.all([
    Review.create({ userId: 1, productId: 2, reviewText: 'Had no idea what it was until my 9 yr old said she wanted only Mip for her 10th birthday... When did my HW the reviews were great and I thought it was very cool. When I gave it to her she went crazy! Bottom line great toy and even better service!'}),
    Review.create({ userId: 1, productId: 5, reviewText: 'This is a truly fun product that does everything its advertised to do. My grandson has a ball with this robot - and the capture game and the stacking game are fun and amazing. Well worth the price.' }),
    Review.create({ userId: 2, productId: 2, reviewText: 'This was pretty cool... while it lasted. My 10 year old son loved it for a while, but now it just sits in the corner with a blank, silent stare. We had gotten the third-party, full control app for it and that was kinda cool. Never did look into doing something with the SDK - that may have been cool, but it seemed like its capacity was maxed out with that third-party app. Would be nice if MiP had more capability and customizability. My son breaks it out once in a blue moon, but sadly I think MiPs time peaked about a month after Christmas.' }),
    Review.create({ userId: 5, productId: 5, reviewText: 'This little robot is really cute! Not sure what it really does, but my 11 yo son got an app for it on my phone and he loves to play with it!' }),
    Review.create({ userId: 5, productId: 20, reviewText: 'Bought this for my son. But I think I play with it more then he does. I love it! He does to.. But I think I do more. Can even use ipod touch to manual control him. Awesomeness' }),
    Review.create({ userId: 1, productId: 20, reviewText: 'My brother Robert who has been bed ridden and paralyzed with Multiple Sclerosis from his neck down for more than 30 years now has a new borg! He was in tears with happiness when the borg played 70s music, played Jeopardy, answered all his questions and wakes him up every morning.Thank you BorgPetCo for giving my brother a new bedside companion.' }),
    Review.create({ userId: 5, productId: 17, reviewText: 'The lights, sound effects, and color scheme are on key. It, or should I say he, requires a lot of room to perform the preprogrammed animations. This toy is also FAST, so any hard collisions with things in the room could disrupt his internal circuity causing possible malfunctions. This is definitely an indoor toy. If you were to use him outdoors, it will wear down the paint finish. With every great toy, there are going to be some drawbacks to discuss.' }),
    Review.create({ userId: 4, productId: 17, reviewText: 'It works is several modes and can take on several different bots, each with its own personality, The more you use it the more you discover more of its hidden capabilities (or talents?) It surprises you with how well it can interact with its humor and conversation. You can message it and it will respond, often with clever replies and jokes. And if you ignore it, it will ask for attention.' }),
    Review.create({ userId: 3, productId: 17, reviewText: 'My son and I have really enjoyed playing with this Borg. We liked the fact thats its fast and its able to move on tile floor, grass and even tried it on the street.We liked how it moved in the street but of course youll scratch it and get it dirty so do it at your own risk. Liked that it has 3 ways of controlling it you can use the control, it will follow you and voice control(limited phrases). Borg feels solid feels like it will last a long time.' }),
    Review.create({ userId: 2, productId: 17, reviewText: 'Being a family of Star War fans, this droid has been a big hit for all of us. This product is just fun. The lights and sound effects are great. There is a remote controller that can move the droid, while it makes noises and speeds around. I love the Voice recognition which works great. If you say Follow Me., the little cutie finds you and moves with you. Just give it room . He moves fast with all of the sounds and movements of Star War droids. The toy is heavy and somewhat tricky to initially set up. You must charge the head and body, put batteries in the controller and then attach the head to the body. After the first time of setting it up, it is just fun and easy to re-charge and get going' }),
    Review.create({ userId: 4, productId: 3, reviewText: 'I let my 7 year old niece play with it for awhile. She just giggled and giggled as she annoyed the dogs and ran it into everything in my house. I can see hours and hours of entertainment for the little ones with this.' }),
    Review.create({
      userId: 3, productId: 1, reviewText: 'In RC mode you need to make sure you have plenty of room. He has a wide turning radius and will smash into furniture. The voice response is fun. My favorite is the "Borg please" command. When you say it he rolls his head around like hes got an attitude.He beeps and lights up just like the original.' }),
    Review.create({
      userId: 2, productId: 8, reviewText: 'Did I mention he was fast? One thing you will want to be aware of is that if he strikes a couch or end table with enough force, the head will come off causing him to "scream" until you replace it (getting used to putting the head unit on pays off here). One other thing to note, if your floors have big transitions going from hardwood floors to a high pile carpet, you will need to have some speed to get "up" onto the carpet. From a standstill, he does have some issues getting "up" onto the carpet. But once hes on there, its smooth sailing. Going from carpet to the hardwoods is not an issue at all. When stopping on hardwoods, be sure to stop early, as he "slides" since the hard plastic shell of his body doesnt really "grip" hardwoods well.' }),
    Review.create({
      userId: 1, productId: 4, reviewText: 'This really does not go with the age range on the box. My grandson (age 21) and my husband love this thing. My husband called me because he wanted it for himself but I said we should get it for our grandsons birthday.They had that thing going all over the house yesterday. It does everything it says it does. Maybe the reason some people were disappointed in it, was they were really expecting a toy for kids.This is a top for grown-up men who love borgs. The whole family did think it was a cute borg, but the guys really enjoyed it.They had no problems with it and our grandson said hed pay for one for my husband. Its a bit silly but it gives them a great deal of entertainment. We found no problems with this and plan to buy a second one.' }),
    Review.create({ userId: 5, productId: 4, reviewText: 'I bought two of this borg - 1 for each of my grandsons. One is 10 the other 3 1/ 2. So the Dads have to participate as well. We had no problem with them at all. The robot scooted along my thinner rug in the family room with no problem and really flew on my hardwood floors. The both have hardwood floors at their homes. I emailed both the dads to find out how they are doing 3 weeks after I gave them the toys. They are doing just great. All the kids in the house love this one! It has become a member of the family. No issues as all. They are constantly finding new things to program into him. I told the Dads I will buy them Jedi robes and laser sabers. May the force be with you too.' }),
  ])

  console.log(`seeded ${reviews.length} orderitems`)
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
