const router = require('express').Router()
const Session = require('../models/tokenSession')

router.post('/', async (request, response) => {
  const id = request.body.id

  const sessionInfo = await Session.findOne({
    where: {
      userId: id,
    },
  })
  console.log(sessionInfo.toJSON())
  await sessionInfo.destroy()
  response.status(201).send('Logout succesful')
})

module.exports = router
