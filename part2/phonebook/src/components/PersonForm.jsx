import contactsService from '../services/Contacts'

const PersonForm = ({ newName, onNameChange, onNumberChange, newPhoneNumber, persons, setPersons, setNewName, setNewPhoneNumber }) => {

  const addNewContact = (event) => {
    event.preventDefault()

    const sameOldPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (sameOldPerson && sameOldPerson.number === newPhoneNumber) {
      window.alert(`${sameOldPerson.name} has already been added!`)
      return
    }

    if (sameOldPerson) {
      if (window.confirm(`${sameOldPerson.name} already exists, would you like to replace phone number?`)) {
        const samePersonNewNumber = { ...sameOldPerson, number: newPhoneNumber }
        contactsService
          .updatePhoneNumber(samePersonNewNumber)
          .then(() => {
            const newContactList = persons.map(person =>
              person === sameOldPerson ? samePersonNewNumber : person)
            setPersons(newContactList)
            setNewName('')
            setNewPhoneNumber('+358')
          })
          .catch(error => {
            window.alert(`Looks like user ${sameOldPerson.name} doesn't exist!`)
            setPersons(persons.filter(person => person.id !== sameOldPerson.id))
            setNewName('')
            setNewPhoneNumber('+358')
          })
      }
      return
    }

    const newContact = {
      name: newName,
      number: newPhoneNumber
    }

    contactsService
      .addContactDB(newContact)
      .then(contact => {
        setPersons(persons.concat(contact))
        setNewName('')
        setNewPhoneNumber('+358')
      })
      .catch(error => console.log(`Some error ${error}`))
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addNewContact}>add</button>
      </div>
    </form>
  )
}

export default PersonForm
