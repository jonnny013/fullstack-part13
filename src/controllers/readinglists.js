const router = require('express').Router()
const {  ReadingList, User } = require('../models')
const {tokenExtractor} = require('../util/middleware')


router.post('/', tokenExtractor, async (request, response) => {
  const body = request.body
  const reading_lists = await ReadingList.create(body)
  return response.json(reading_lists)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const listToUpdate = await ReadingList.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)
  if (user.id !== listToUpdate.userId) {
    return res.status(403).send('Restricted access')
  }
  listToUpdate.unread = req.body.unread
  const result = await listToUpdate.save()
  res.json(result)
})

module.exports = router
