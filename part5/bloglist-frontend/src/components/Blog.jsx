import axios from "axios"
import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, userToken, blogs, setBlogs }) => {
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

  const likeBlog = async () => {
    const { id, user, ...blogWithLike } = blog
    blogWithLike.likes += 1
    const updatedBlog = await blogService.update(blogWithLike, blog.id)
    const blogsWithUpdatedBlog = blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)
    setBlogs(blogsWithUpdatedBlog)
    console.log(updatedBlog)
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
      </div>
    </div>
  )
}

export default Blog
