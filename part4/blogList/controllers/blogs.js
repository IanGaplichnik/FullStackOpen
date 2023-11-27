const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  console.log('IN POST')
  const blogRequest = {
    likes: request.body.likes ? request.body.likes : 0,
    ...request.body
  }
  console.log(blogRequest)
  const blog = new Blog(blogRequest)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
