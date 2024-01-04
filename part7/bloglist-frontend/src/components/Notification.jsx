import '../index.css'
import PropTypes from 'prop-types'
import { NotificationContext } from './NotificationContext'
import { useContext } from 'react'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  console.log(notification)

  if (!notification.msg) return null
  return (
    <div className={notification.status}>
      <p>{notification.msg}</p>
    </div>
  )
}

export default Notification
