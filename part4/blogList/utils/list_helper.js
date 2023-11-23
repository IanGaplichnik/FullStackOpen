const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : _.maxBy(blogs, (blog) => blog.likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  const authorHasBlogs = _.countBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(Object.keys(authorHasBlogs), (author) => authorHasBlogs[author])
  return {
    author: authorWithMostBlogs,
    blogs: authorHasBlogs[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null

  const authorBlogs = _.groupBy(blogs, 'author')
  const authorLikesDict = _.mapValues(authorBlogs,
    function calculateLikesPerAuthor(author) {
      return author.reduce((sum, blog) => sum + blog.likes, 0)
    })
  const authorMostLikes = _.maxBy(Object.keys(authorLikesDict), (author) => authorLikesDict[author])
  return {
    author: authorMostLikes,
    likes: authorLikesDict[authorMostLikes]
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
