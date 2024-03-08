const express = require('express')
require('express-async-errors')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readinglists')
const {errorHandler} = require('./util/middleware')

const app = express()



app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
}

app.use(errorHandler)

start()