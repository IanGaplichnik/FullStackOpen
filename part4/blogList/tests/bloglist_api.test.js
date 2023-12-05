const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared')

  const userToSave = testHelper.initialUserList[0]
  await api.post('/api/users')
    .send(userToSave)

  const loginResponse = await api.post('/api/login').send(userToSave)

  for (const blog of testHelper.initialBlogList) {
    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
  }

  // const blogObjects = testHelper.initialBlogList.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)

})

describe('when there is initially some saved blogs', () => {
  test('server returns right amount of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(testHelper.initialBlogList.length)
  })

  test('backend renames __id parameter to id', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => expect(blog.id).toBeDefined())
  })

  test('post request saves blog correctly', async () => {
    const loginUser = testHelper.initialUserList[0]
    const loginResponse = await api.post('/api/login').send(loginUser)

    const exampleBlog = {
      title: 'Template Title',
      author: 'Template author',
      url: 'Template URL',
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(exampleBlog)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(201)

    const blogsInDb = await testHelper.blogsInDb()
    const lastBlogIndex = blogsInDb.length - 1
    const receivedBlog = blogsInDb[lastBlogIndex]
    delete receivedBlog.id

    expect(blogsInDb.length).toEqual(testHelper.initialBlogList.length + 1)
    expect(receivedBlog.title).toEqual(exampleBlog.title)
    expect(receivedBlog.author).toEqual(exampleBlog.author)
    expect(receivedBlog.url).toEqual(exampleBlog.url)
  })

  test('post request without likes saves 0 likes', async () => {
    const loginUser = testHelper.initialUserList[0]
    const loginResponse = await api.post('/api/login').send(loginUser)

    const blogWOLikes = {
      title: 'Template Title',
      author: 'Template author',
      url: 'Template URL',
    }

    await api
      .post('/api/blogs')
      .send(blogWOLikes)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)

    const response = await api.get('/api/blogs/')
    const lastBlogIndex = response.body.length - 1
    const receivedBlog = response.body[lastBlogIndex]

    expect(blogWOLikes.likes).toBeUndefined()
    expect(receivedBlog.likes).toEqual(0)
  })


  test('post request without token returns status 401', async () => {
    const blog = {
      title: 'Title',
      author: 'Template author',
      url: 'Template URL',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })

  test('post request without title returns 400', async () => {
    const loginUser = testHelper.initialUserList[0]
    const loginResponse = await api.post('/api/login').send(loginUser)

    const blogWOTitle = {
      author: 'Template author',
      url: 'Template URL',
    }

    await api
      .post('/api/blogs')
      .send(blogWOTitle)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(400)
  })

  test('post request without url returns 400', async () => {
    const loginUser = testHelper.initialUserList[0]
    const loginResponse = await api.post('/api/login').send(loginUser)

    const blogWOUrl = {
      title: 'Template Title',
      author: 'Template author',
    }

    await api
      .post('/api/blogs')
      .send(blogWOUrl)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(400)
  })

  test('delete valid object works', async () => {
    const loginUser = testHelper.initialUserList[0]
    const loginResponse = await api.post('/api/login').send(loginUser)

    const blogs = await api.get('/api/blogs')
    const idToDelete = blogs.body[0].id
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(200)
  })

  test('update valid object', async () => {
    const blogsInCloud = await api
      .get('/api/blogs')

    const blogUpdateId = blogsInCloud.body[0].id

    const updateBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
      likes: 15
    }

    const response = await api
      .put(`/api/blogs/${blogUpdateId}`)
      .send(updateBlog)
      .expect(200)

    expect(response.body.title).toStrictEqual(updateBlog.title)
    expect(response.body.author).toStrictEqual(updateBlog.author)
    expect(response.body.url).toStrictEqual(updateBlog.url)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
