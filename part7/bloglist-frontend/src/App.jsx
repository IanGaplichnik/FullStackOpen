import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { NotificationContext } from './components/NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const togglableRef = useRef()

  useEffect(() => {
    // console.log(user)
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
  }

  const sortedBlogList = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          likeClickHandler={() => likeBlog(blog)}
          username={user.username}
        />
      ))

  const likeBlog = async (blog) => {
    const { id, ...blogWithLike } = blog
    blogWithLike.likes += 1
    blogWithLike.user = blog.user.id

    try {
      const updatedBlog = await (
        await blogService.update(blogWithLike, blog.id)
      ).data
      const blogsWithUpdatedBlog = blogs.map((blogIn) =>
        blogIn.id === updatedBlog.id ? updatedBlog : blogIn
      )
      setBlogs(blogsWithUpdatedBlog)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const blogBlock = () => {
    return (
      <div>
        <p>
          {user.username} is logged in <button onClick={logout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={togglableRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            togglableRef={togglableRef}
          />
        </Togglable>
        {sortedBlogList()}
      </div>
    )
  }

  return (
    <div>
      {!user && (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm setUser={setUser} />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          {blogBlock()}
        </>
      )}
    </div>
  )
}

export default App
