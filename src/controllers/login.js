const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/tokenSession')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }
  if (user.disabled) {
    return response.status(403).json({error: 'Your account has been disabled'})
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 * 24 })
  const sessionInfo = {
    token,
    userId: user.id,
    expiration: new Date(Date.now() + (24 * 60 * 60 * 1000))
  }
  await Session.create(sessionInfo)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
