import { useState } from "react"
import Notification from "./Notification"
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ errorMessage, status, setStatus, setUser, setErrorMessage, failureStatus, successStatus }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

export default LoginForm