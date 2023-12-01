const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const initialUserList = [
  {
    name: 'Jane Doe',
    username: 'userJD',
    password: 'very_strong_password'
  },
  {
    name: 'Sheldon Brown',
    username: 'userSB',
    password: 'the_strongest_password'
  },
  {
    name: 'Iron Man',
    username: 'userIM',
    password: 'beepboop123'
  }
]

const usersInDb = async () => {
  const usersInDb = await User.find({}).populate('user')
  return usersInDb.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogsInDb = await Blog.find({})
  return blogsInDb.map(blog => blog.toJSON())
}

module.exports = { initialBlogList, initialUserList, usersInDb, blogsInDb }
