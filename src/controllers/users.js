const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: ReadingList,
        attributes: { exclude: ['userId', 'blogId'] },
        include: {
          model: Blog,
          attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
          },
      },
    ],
  })
  if (!req.user) throw Error('User not found')
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: ReadingList,
        attributes: { exclude: ['userId'] },
      },
    ],
  })

  res.json(users)
})

router.get('/:id', async (req, res) => {

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      {
        model: ReadingList,
        attributes: { exclude: ['userId', 'blogId'] },
        include: {
          model: Blog,
          attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        },
        where: req.query.read ? { unread: req.query.read } : {},
        required: false
      },
    ],
  })
  if (!user) throw Error('User not found')

  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  return res.json(user)
})

router.put('/:id', userFinder, async (req, res) => {
  console.log('current: ', req.user.username, 'new: ', req.body.username)
  req.user.username = req.body.username

  await req.user.save()
  res.json(req.user)
})

module.exports = router
