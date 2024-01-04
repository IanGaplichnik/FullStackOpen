import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogBlock from './components/BlogBlock'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 1,
  })

  if (result.isLoading) return <div>Loading</div>
  if (result.isError) return <div>Server problem</div>
  const blogs = result.data

  // useEffect(() => {
  //   // console.log(user)
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
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
          <p>
            {user.username} is logged in{' '}
            <button onClick={logout}>logout</button>
          </p>
          <BlogBlock blogs={blogs} user={user} />
          {/* <BlogBlock blogs={blogs} setBlogs={setBlogs} user={user} /> */}
        </>
      )}
    </div>
  )
}

export default App
