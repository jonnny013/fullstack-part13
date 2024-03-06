const router = require('express').Router()

const { User } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  if (!req.user) throw Error('User not found')
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.get('/:id', userFinder, async (req, res) => {
  console.log(req.user.toJSON())
  res.json(req.user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:id', userFinder, async (req, res) => {
  req.user.likes = req.body.likes
  await req.user.save()
  res.json(req.user)
})

router.delete('/:id', userFinder, async (req, res) => {
  console.log(req.user.toJSON())
  await req.user.destroy()
  res.status(200).json('Deleted')
})
module.exports = router
