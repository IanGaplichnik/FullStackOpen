import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  const [status, setStatus] = useState('')
  const failureStatus = 'failure'
  const successStatus = 'success'

  const blogFormRef = useRef()

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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} status={status} />
        <p>{user.username} is logged in <button onClick={logout}>logout</button>
        </p>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setStatus={setStatus}
            successStatus={successStatus}
            failureStatus={failureStatus}
            blogFormRef={blogFormRef} />
        </Togglable>
        {
          blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              userToken={user.token}
              blogs={blogs}
              setBlogs={setBlogs} />
          )
        }
      </div>
    )
  }

  return (
    <div>
      {!user &&
        <LoginForm
          errorMessage={errorMessage}
          status={status}
          setStatus={setStatus}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          failureStatus={failureStatus}
          successStatus={successStatus} />
      }
      {user && blogList()}
    </div>
  )
}

export default App
