import contactsService from '../services/Contacts'

const Contacts = ({ contactsToDisplay, allContacts, setPersons }) => {

  const deleteOnClick = (id, name) => (event) => {
    event.preventDefault()

    if (window.confirm(`Delete ${name}?`)) {
      contactsService
        .deleteContact(id)
        .then(() => {
          const updatedContactList = allContacts.filter(contact => contact.id !== id)
          setPersons(updatedContactList)
        })
        .catch(() => {
          alert(`${name} has already been deleted!`)
          setPersons(allContacts.filter(person => person.id !== id))
        })
    }
  }

  return (
    contactsToDisplay.map(person => {
      return (
        <div key={person.id}>
          <p>{person.name} {person.number}
            <button onClick={deleteOnClick(person.id, person.name)}>delete</button>
          </p>
        </div>
      )
    })
  )
}

export default Contacts
