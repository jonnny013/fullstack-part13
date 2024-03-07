const jwt = require('jsonwebtoken')
const {SECRET} = require('./config')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.message === 'User not found') {
    return response.status(400).send({error: 'User not found'})
  }
  if (error.message === 'Blog not found') {
    return response.status(400).send({ error: 'Blog not found' })
  }
  if (/Validation isEmail on username failed/.test(error.message)) {
    return response.status(400).send({
      error: 'Please provide an email as your username',
    })}
  if (/Validation max on year failed/.test(error.message)) {
    return response.status(400).send({
      error: 'Year should not be in the future',
    })
  }
    if (/Validation min on year failed/.test(error.message)) {
      return response.status(400).send({
        error: 'Year should not be earlier than 1991',
      })
    }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {errorHandler, tokenExtractor}