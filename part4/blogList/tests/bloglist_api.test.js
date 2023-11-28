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

describe('when there is initially some saved blogs', () => {
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

    await api
      .post('/api/blogs')
      .send(exampleBlog)

    const response = await api.get('/api/blogs/')
    const lastBlogIndex = response.body.length - 1
    const receivedBlog = response.body[lastBlogIndex]
    delete receivedBlog.id

    expect(response.body.length).toEqual(initialBlogList.length + 1)
    expect(exampleBlog).toStrictEqual(receivedBlog)
  }, 100000)

  test('post request without likes saves 0 likes', async () => {
    const blogWOLikes = {
      title: 'Template Title',
      author: 'Template author',
      url: 'Template URL',
    }

    await api
      .post('/api/blogs')
      .send(blogWOLikes)

    const response = await api.get('/api/blogs/')
    const lastBlogIndex = response.body.length - 1
    const receivedBlog = response.body[lastBlogIndex]

    expect(blogWOLikes.likes).toBeUndefined()
    expect(receivedBlog.likes).toEqual(0)
  })

  test('post request without title returns 400', async () => {
    const blogWOTitle = {
      author: 'Template author',
      url: 'Template URL',
    }

    await api
      .post('/api/blogs')
      .send(blogWOTitle)
      .expect(400)
  })

  test('post request without url returns 400', async () => {
    const blogWOUrl = {
      title: 'Template Title',
      author: 'Template author',
    }

    await api
      .post('/api/blogs')
      .send(blogWOUrl)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
