import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationText = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notificationText === null) return null

  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

export default Notification
