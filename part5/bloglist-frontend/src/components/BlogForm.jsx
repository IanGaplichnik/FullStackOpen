import { useState } from "react"

import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setErrorMessage, setStatus, successStatus, failureStatus, blogFormRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      const allBlogs = blogs.concat(savedBlog)
      setBlogs(allBlogs)
      setErrorMessage(`Blog ${savedBlog.title} by ${savedBlog.author} has been saved!`)
      setStatus(successStatus)
      setAuthor('')
      setTitle('')
      setUrl('')
      setTimeout(() => setErrorMessage(null), 10000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatus(failureStatus)
      setTimeout(() => setErrorMessage(null), 5000)
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

export default BlogForm
