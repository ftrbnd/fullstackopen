const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'Missing username or password' })
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'Username or password is too short' })
  }

  const users = await User.find({})
  if (users.some(user => user.username === username)) {
    return response.status(400).json({ error: 'Username already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const users = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

module.exports = usersRouter