const router = require('express').Router()
const { Product } = require('../db/models')
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
