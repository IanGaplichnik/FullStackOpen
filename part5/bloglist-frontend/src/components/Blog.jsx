import axios from 'axios'
import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, likeClickHandler }) => {
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

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`))
      deleteBlog()
  }

  const deleteBlog = async () => {
    try {
      const response = await blogService.deleteBlog(blog.id)
      const blogsWithoutDeleted = blogs.filter((blogInMap) => blog.id !== blogInMap.id)
      setBlogs(blogsWithoutDeleted)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  return (
    <div style={blogStyle} className='Blog'>
      <p>{blog.title} {blog.author}</p>
      <button onClick={switchVisible}>{infoVisible ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={likeClickHandler}>like</button></p>
        <p>{blog.user.username}</p>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  likeClickHandler: PropTypes.func.isRequired
}

export default Blog
