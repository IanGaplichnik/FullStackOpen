import '../index.css'
const Notification = ({ message, status }) => {
  if (!message)
    return null
  return (
    <div className={status}>
      <p>{message}</p>
    </div>
  )
}

export default Notification
