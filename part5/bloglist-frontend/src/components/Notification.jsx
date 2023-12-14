import '../index.css'
import PropTypes from 'prop-types'

const Notification = ({ notificationText, status }) => {
  if (!notificationText)
    return null
  return (
    <div className={status}>
      <p>{notificationText}</p>
    </div>
  )
}

Notification.propTypes = {
  status: PropTypes.string.isRequired
}

export default Notification
