import axios from 'axios'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setErrorMessage, setStatus, failureStatus }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const switchVisible = () => {
    setInfoVisible(!infoVisible)
  }

  const deleteBlog = async () => {
    try {
      const response = await blogService.deleteBlog(blog.id)
      const blogsWithoutDeleted = blogs.filter((blogInMap) => blog.id !== blogInMap.id)
      setBlogs(blogsWithoutDeleted)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatus(failureStatus)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const likeBlog = async () => {
    const { id, ...blogWithLike } = blog
    blogWithLike.likes += 1
    blogWithLike.user = blog.user.id

    try {
      const updatedBlog = await (await blogService.update(blogWithLike, blog.id)).data
      const blogsWithUpdatedBlog = blogs.map((blogIn) => blogIn.id === updatedBlog.id ? updatedBlog : blogIn)
      setBlogs(blogsWithUpdatedBlog)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatus(failureStatus)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const showWhenVisible = { display: infoVisible ? '' : 'none' }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={switchVisible}>{infoVisible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.username}</p>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}

export default Blog
