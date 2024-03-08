const router = require('express').Router()
const {  ReadingList } = require('../models')
const {tokenExtractor} = require('../util/middleware')


router.post('/', tokenExtractor, async (request, response) => {
  const body = request.body
  const reading_lists = await ReadingList.create(body)
  return response.json(reading_lists)
})

module.exports = router
