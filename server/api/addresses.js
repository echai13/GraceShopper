const router = require('express').Router()
const { Address } = require('../db/models')
module.exports = router


router.get(`/:userId`, (req, res, next) => {
  Address.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(addresses => res.json(addresses))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  await Address.create(req.body);
  
  Address.findAll({
    where: {
      userId: req.body.userId
    }
  })
    .then(addresses => res.json(addresses))
    .catch(next)
})
