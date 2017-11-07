const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
        if (req.session.cartId) {
          Order.findById(req.session.cartId)
          .then(order => order.setUser(user))
          .catch(next); }
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  // // delete req.cart
  delete req.session.cartId
  // console.log('REQ.BODYYYYYY', req.body)
  // console.log('REQ.USERRRR', req.user)
  // console.log('inside of logout cart and session.cartId: ', req.cart, req.session.cartId)
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  //console.log('THE REQ', req)
  res.json(req.user)
})

router.use('/google', require('./google'))
