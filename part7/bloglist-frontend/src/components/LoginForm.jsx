import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { NotificationContext } from './NotificationContext'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatchNotification } = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchNotification({
        type: 'SET_SUCCESS',
        payload: `User ${user.name} logged in`,
      })
      setTimeout(() => dispatchNotification({ type: 'RESET' }), 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatchNotification({
        type: 'SET_FAILURE',
        payload: 'Wrong credentials',
      })
      setTimeout(() => dispatchNotification({ type: 'RESET' }), 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{' '}
        <input
          type='text'
          value={password}
          name='Password'
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button'>
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
