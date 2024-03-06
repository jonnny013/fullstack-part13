const router = require('express').Router()

const {Blog} = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) throw Error("User not found")
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    console.log(req.blog.toJSON())
    res.json(req.blog)

})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    return res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
    console.log(req.blog.toJSON())
    await req.blog.destroy()
    res.status(200).json('Deleted')
})
module.exports = router