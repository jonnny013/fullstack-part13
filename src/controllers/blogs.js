const router = require('express').Router()
const {Blog, User} = require('../models')
const {tokenExtractor} = require('../util/middleware')
const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ['name'],
    },
  })
  if (!req.blog) throw Error("Blog not found")
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.substring]: req.query.search } },
      { author: { [Op.substring]: req.query.search } },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    order: [['likes', 'DESC']],
    include: {
      model: User,
      attributes: ['name'],
    },
    where
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    console.log(req.blog.toJSON())
    res.json(req.blog)

})

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
    return res.json(blog)
})

router.put('/:id', tokenExtractor, blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    console.log(req.blog.toJSON())
    
    const user = await User.findByPk(req.decodedToken.id)
    if (user.id !== req.blog.userId) {
      return res.status(403).send("Restricted access")
    }
    await req.blog.destroy()
    res.status(200).json('Deleted')
})
module.exports = router