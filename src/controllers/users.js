const router = require('express').Router()

const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({where: {username: req.params.username}})
  if (!req.user) throw Error('User not found')
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })

  res.json(users)
})

router.get('/:username', userFinder, async (req, res) => {
  console.log(req.user.toJSON())
  res.json(req.user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:username', userFinder, async (req, res) => {
  console.log('current: ', req.user.username, 'new: ', req.body.username)
  req.user.username = req.body.username
  
  await req.user.save()
  res.json(req.user)
})

module.exports = router
