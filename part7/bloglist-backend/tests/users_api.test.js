const testHelper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when no users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    console.log('user db cleared')
  })

  test('creating user is successful', async () => {
    const newUser = testHelper.initialUserList[0]

    const userToSave = new User(newUser)
    const savedUser = await userToSave.save()

    const usersInDb = await testHelper.usersInDb()
    expect(usersInDb).toHaveLength(1)
    expect(usersInDb).toContainEqual(savedUser.toJSON())
  })

  test('creating user without username returns error', async () => {
    let error
    const newUser = {
      name: 'Jane Doe',
      password: 'very_strong_password'
    }
    const userToSave = new User(newUser)
    try {
      await userToSave.save()
    } catch (exception) {
      error = exception
    }

    expect(error.name).toStrictEqual('ValidationError')
  })

  test('post request without username returns 400', async () => {
    const newUser = {
      name: 'Jane Doe',
      password: 'very_strong_password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'username too short or empty' })
  })

  test('creating user with short username returns error', async () => {
    let error
    const newUser = {
      username: 'JK',
      name: 'Jane Doe',
      password: 'very_strong_password'
    }
    const userToSave = new User(newUser)
    try {
      await userToSave.save()
    } catch (exception) {
      error = exception
    }

    expect(error.name).toStrictEqual('ValidationError')
  })

  test('creating user with short password returns 400 and error msg', async () => {
    const newUser = {
      username: 'userJK',
      name: 'Jane Doe',
      password: 'va'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'password too short' })
  })

  test('post request with short username returns 400 and error msg', async () => {
    const newUser = {
      username: 'KU',
      name: 'Jane Doe',
      password: 'very_strong_password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'username too short or empty' })
  })
})

describe('when some users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    console.log('user db cleared')

    const newUsers = testHelper.initialUserList.map(user => new User(user))
    const promises = newUsers.map(async (user) => user.save())
    await Promise.all(promises)
    console.log('saved initial users')
  })

  test('get request returns all users', async () => {
    const usersInDb = await api.get('/api/users')
    const usersInDbWOIdAndBlogs = usersInDb.body.map(user => {delete user.id; delete user.blogs; return user})
    const initialUserListWOPassword = testHelper.initialUserList.map(user => {delete user.password; return user})

    expect(usersInDbWOIdAndBlogs).toEqual(expect.arrayContaining(initialUserListWOPassword))
  })

  test('creating user is successful', async () => {
    const newUser = {
      name: 'unique_name',
      username: 'unique_username',
      password: 'very_unique_password'
    }

    const userToSave = new User(newUser)
    const savedUser = await userToSave.save()

    const usersInDb = await testHelper.usersInDb()
    expect(usersInDb).toHaveLength(testHelper.initialUserList.length + 1)
    expect(usersInDb).toContainEqual(savedUser.toJSON())
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
