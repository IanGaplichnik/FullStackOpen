const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  if (!Object.hasOwn(request.body, 'title')
    || !Object.hasOwn(request.body, 'url'))
    return response.status(400).end()

  if (!Object.hasOwn(request, 'token')) {
    return response.status(401).json({ error: 'token invalid' })
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blogRequest = {
      likes: request.body.likes ? request.body.likes : 0,
      user: user,
      ...request.body
    }
    const blog = new Blog(blogRequest)
    try {
      const result = await blog.save()
      response.status(201).json(result)
    } catch(exception) {
      next(exception)
    }
  } catch (err) {
    return response.status(400).json(err)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndDelete(id)
    response.status(200).end()
  } catch(exception) {
    response.status(404).end()
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id

  if (!Object.hasOwn(request.body, 'title')
    || !Object.hasOwn(request.body, 'url'))
    return response.status(400).end()

  const blogUpdate = {
    likes: request.body.likes ? request.body.likes : 0,
    ...request.body
  }

  try {
    const updatedResult = await Blog.findByIdAndUpdate(id, blogUpdate, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    response.json(updatedResult)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
