import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, togglableRef, setNotificationText, setSuccessStatus, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetFormHooks = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      createBlog(title, author, url)
      resetFormHooks()
      togglableRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input
          type="text"
          value={title}
          name="Title"
          placeholder='Enter title'
          id='title'
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author: <input
          type="text"
          value={author}
          name="Author"
          placeholder='Enter author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input
          type='text'
          value={url}
          name='URL'
          placeholder='Enter URL'
          id='url'
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit' id='create-button'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotificationText: PropTypes.func.isRequired,
  setSuccessStatus: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
