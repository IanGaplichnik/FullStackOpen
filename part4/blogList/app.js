const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoBD')

mongoose.connect(config.MONGODB_URI)
  .then(() =>
    logger.info('Connected to MongoDB')
  )
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app