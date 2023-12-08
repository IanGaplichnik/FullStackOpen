import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [status, setStatus] = useState('')
  const failureStatus = 'failure'
  const successStatus = 'success'

  useEffect(() => {
    // console.log(user)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    // console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setStatus(successStatus)
      setErrorMessage(`User ${user.username} logged in`)
      setTimeout(() => setErrorMessage(null), 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setStatus(failureStatus)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} status={status} />
        <div>
          username <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} status={status} />
        <p>{user.username} is logged in <button onClick={logout}>logout</button>
        </p>
        {blogForm()}
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
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
      setErrorMessage(`Blog ${savedBlog.title} by ${savedBlog.author} has been saved!`)
      setStatus(successStatus)
      setAuthor('')
      setTitle('')
      setUrl('')
      setTimeout(() => setErrorMessage(null), 10000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setStatus(failureStatus)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const blogForm = () => {
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

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App
