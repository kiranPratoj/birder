const express = require('express')
const _ = require('lodash')
const router = express.Router()
const { User } = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication')

// localhost:3006/users/register
router.post('/register', function (req, res) {
  const body = req.body
  const user = new User(body)
  user.save()
    .then(function (user) {
      // res.send(user)
      // res.send({ _id: user._id, username: user.username, email: user.email})
      res.send(_.pick(user, ['_id', 'username', 'email', 'createdAT']))
    })
    .catch(function (err) {
      res.send(err)
    })
})

// localhost:3006/users/login 
router.post('/login', function (req, res) {
  const body = req.body
  User.findByCredentials(body.email, body.password) // findByCredentials is custom method
    .then(function (user) {
      return user.generateToken()
      // res.send(user)
    })
    .then(function (token) {
      // res.setHeader('x-auth', token).send({})
      res.send({ token })
    })
    .catch(function (err) {
      res.send(err)
    })

})

// localhost:3000/users/account 
router.get('/account', authenticateUser, function (req, res) {
  const { user } = req
  // res.send(user)
  res.send(_.pick(user, ['_id', 'username', 'email', 'createdAT']))
})

// localhost:3000/users/logout
router.delete('/logout', authenticateUser, function (req, res) {
  const { user, token } = req
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function () {
      res.send({ notice: 'successfully logged out' })
    })
    .catch(function (err) {
      res.send(err)
    })
})

module.exports = {
  usersRouter: router
}