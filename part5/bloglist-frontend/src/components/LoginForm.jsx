import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setSuccessStatus, setNotificationText, setFailStatus }) => {
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
      setSuccessStatus()
      setNotificationText(`User ${user.username} logged in`)
      setTimeout(() => setNotificationText(null), 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationText('Wrong credentials')
      setFailStatus()
      setTimeout(() => setNotificationText(null), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setSuccessStatus: PropTypes.func.isRequired,
  setNotificationText: PropTypes.func.isRequired,
  setFailStatus: PropTypes.func.isRequired,
}

export default LoginForm
