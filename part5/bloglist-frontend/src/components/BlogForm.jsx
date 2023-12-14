import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, togglableRef, setNotificationText, setSuccessStatus }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetFormHooks = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const setNotificationBlogCreated = (savedBlog) => {
    setNotificationText(`Blog ${savedBlog.title} by ${savedBlog.author} has been saved!`)
    setSuccessStatus()
    setTimeout(() => setNotificationText(null), 10000)
  }

  const createBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      const allBlogs = blogs.concat(savedBlog)
      setBlogs(allBlogs)
      resetFormHooks()
      setNotificationBlogCreated(savedBlog)
      togglableRef.current.toggleVisibility()
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title: <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author: <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotificationText: PropTypes.func.isRequired,
  setSuccessStatus: PropTypes.func.isRequired
}

export default BlogForm
