const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  if (!Object.hasOwn(request.body, 'password')) {
    return response.status(400).json({ error: 'password missing' })
  }

  if (request.body.password.length < 3) {
    return response.status(400).json({ error: 'password too short' })
  }

  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, name, passwordHash })
  try {
    const savedUser = await newUser.save()
    response.status(200).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const usersInDb = await User.find({})
    response.json(usersInDb)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter
