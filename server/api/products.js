const router = require('express').Router()
const { Product, Review } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll({ include: [{ all: true }] })
    .then(products => res.json(products))
    .catch(next)
})

router.post(`/`, (req, res, next) => {
  Product.create(req.body)
    .then(product => {
      product.setCategories(req.body.categories)
      res.json(product)
    })
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next)
})

router.put(`/:productId`, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.update({
        name: req.body.name || product.name,
        image: req.body.image || product.image,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
        stock: req.body.stock || product.stock
      })
      .then(updatedProduct => {
        updatedProduct.setCategories(req.body.categories)
        res.sendStatus(200)
      })
    })
    .catch(next)
})


router.delete(`/:productId`, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      product.destroy()
      .then(res.sendStatus(200))
      .catch(next)
    })
})

//all reviews related routes   //momo started writing from here

router.get("/:productId/reviews", (req, res, next) => {
  return Review.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next);
});


//get one product with reviews??

// router.get("/", (req, res, next) => {
//   return Product.findById(req.params.id, {
//     include: [{ model: Review, as: "review" }]
//   })
//     .then(product => res.json(product))
//     .catch(next);
// });

//post a review to a product
router.post("/:id/reviews", (req, res, next) => {
  return Product.findById(req.params.id).then(product => {
    if (!product) {
      res.sendStatus(404);
    } else {
      let review = req.body;
      review.userId = req.user.id;
      review.productId = req.params.id;
      return Review.create(review).then(createdReview => res.json(createdReview));
    }
  });
});

// should eventually put in a put and delete request for admins and users to edit or delete their reviews right???
//meh ill just put the beginnings in, since the component may not handle it. 
//edit a review of a product
router.put("/:id/reviews",(req, res, next) => {
  return Product.findById(req.params.id).then(product => {
    if (!product) {
      res.sendStatus(404);
    } else {
      let review = req.body;
      return Review.update(review).then(updatedReview => res.json(updatedReview));
    }
  });
});

router.delete( "/:productId/reviews/:reviewId", (req, res, next) => {
    return Review.findById(req.params.reviewId).then(product => {
      if (!product) {
        res.sendStatus(404);
      } else {
        return product.destroy().then(() => res.sendStatus(204));
      }
    });
  }
);

router.get(`/search/:searchTerm`, (req, res, next) => {
  const searchTerm = req.params.searchTerm
  Product.findAll({
    where: {
      $or: {
        name: {
          $like: '%' + searchTerm + '%'
        },
        description: {
          $like: '%' + searchTerm + '%'
        }
      }
    }
  })
    .then(results => res.json(results))
})

