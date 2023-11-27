const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogList = require('./test_helper').initialBlogList

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = initialBlogList.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('server returns right amount of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogList.length)
})

test('backend renames __id parameter to id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(blog => expect(blog.id).toBeDefined())
}, 100000)

test('post request saves blog correctly', async () => {
  const exampleBlog = {
    title: 'Template Title',
    author: 'Template author',
    url: 'Template URL',
    likes: 20
  }

  const blogToSave = Blog(exampleBlog)
  await blogToSave.save()

  const response = await api.get('/api/blogs/')
  const lastBlogIndex = response.body.length - 1
  const receivedBlog = response.body[lastBlogIndex]
  delete receivedBlog.id

  expect(response.body.length).toEqual(initialBlogList.length + 1)
  expect(exampleBlog).toStrictEqual(receivedBlog)
})


afterAll(async () => {
  await mongoose.connection.close()
})
