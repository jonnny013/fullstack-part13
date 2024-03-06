const router = require('express').Router()
const { Blog } = require('../models')
const { Sequelize } = require('sequelize')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    group: ['author'],
    attributes: [
      'author',
    [Sequelize.fn('COUNT', Sequelize.col('title')), 'articles'], 
    [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']],
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

module.exports = router
