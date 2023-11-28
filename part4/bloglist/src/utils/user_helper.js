const User = require('../models/User')

const nonExistingId = async () => {
  const user = new User({
    username: String,
    name: String,
    passwordHash: String
  })

  await user.save()
  await user.deleteOne()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  nonExistingId,
  usersInDb,
}