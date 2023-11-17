import contactsService from '../services/Contacts'

const Contacts = ({ contactsToDisplay, allContacts, setPersons, setNotificationMsg, setNotificationStatus }) => {

  const deleteOnClick = (id, name) => (event) => {
    event.preventDefault()

    if (window.confirm(`Delete ${name}?`)) {
      contactsService
        .deleteContact(id)
        .then(() => {
          const updatedContactList = allContacts.filter(contact => contact.id !== id)
          setPersons(updatedContactList)
          setNotificationMsg(`Deleted ${name}`)
          setNotificationStatus('notificationSuccess')
          setTimeout(() => setNotificationMsg(null), 5000)
        })
        .catch(() => {
          setNotificationMsg(`Information of ${name} has already been removed from server`)
          setNotificationStatus('notificationFail')
          setTimeout(() => setNotificationMsg(null, 'notificationFail'), 5000)
          setPersons(allContacts.filter(person => person.id !== id))
        })
    }
  }

  return (
    contactsToDisplay.map(person => {
      return (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={deleteOnClick(person.id, person.name)}>delete</button>
        </p>
      )
    })
  )
}

export default Contacts
