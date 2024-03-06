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
  next(error)
}

module.exports = {errorHandler}