import { useState, useEffect } from 'react'

import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contact'
import contactsService from './services/Contacts'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter new name')
  const [newPhoneNumber, setNewPhoneNumber] = useState('04')
  const [filterKey, setNewFilterKey] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('notificationSuccess')

  const handleChange = (setStateFunction) => (event) =>
    setStateFunction(event.target.value)

  const contactsToDisplay = persons.filter(person =>
    person.name.toLowerCase().startsWith(filterKey.toLowerCase()))

  useEffect(() => {
    contactsService.
      getAllContactsDB()
      .then(contacts => {
        setPersons(contacts)
      })
      .catch(error => console.log(`Some error ${error}`))
  }, [])

  function replaceContact(contactToReplace) {
    const samePersonNewNumber = { ...contactToReplace, number: newPhoneNumber }
    contactsService
      .updatePhoneNumber(samePersonNewNumber)
      .then(() => {
        const newContactList = persons.map(person =>
          person === contactToReplace ? samePersonNewNumber : person)
        setPersons(newContactList)
        setNewName('')
        setNewPhoneNumber('04')
        setNotificationMsg(`Contact ${samePersonNewNumber.name} is now updated`)
        setNotificationStatus('notificationSuccess')
      })
      .catch(error => {
        setNewName('')
        setNewPhoneNumber('04')
        setNotificationMsg(error.response.data.error)
        setNotificationStatus('notificationFail')
        setTimeout(() => setNotificationMsg(null), 5000)
      })
  }

  function saveContact(newContact) {
    contactsService
      .addContactDB(newContact)
      .then(contact => {
        setPersons(persons.concat(contact))
        setNewName('')
        setNewPhoneNumber('04')
        setNotificationMsg(`Added ${contact.name}`)
        setNotificationStatus('notificationSuccess')
        setTimeout(() => setNotificationMsg(null), 5000)
      })
      .catch(error => {
        setNotificationMsg(error.response.data.error)
        setNotificationStatus('notificationFail')
        setTimeout(() => setNotificationMsg(null), 5000)
      })
  }

  const addNewContact = (event) => {
    event.preventDefault()

    const sameOldPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (sameOldPerson && sameOldPerson.number === newPhoneNumber) {
      window.alert(`${sameOldPerson.name} has already been added!`)
      return
    }

    if (sameOldPerson) {
      if (window.confirm(`${sameOldPerson.name} already exists, would you like to replace phone number?`)) {
        replaceContact(sameOldPerson)
      }
      return
    }

    const newContact = {
      name: newName,
      number: newPhoneNumber
    }

    saveContact(newContact)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMsg} status={notificationStatus} />
      <SearchFilter filterKey={filterKey} onChangeHandler={handleChange(setNewFilterKey)}></SearchFilter>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        onNameChange={handleChange(setNewName)}
        onNumberChange={handleChange(setNewPhoneNumber)}
        newPhoneNumber={newPhoneNumber}
        addNewContact={addNewContact}
      >
      </PersonForm>
      <h2>Numbers</h2>
      <Contacts
        contactsToDisplay={contactsToDisplay}
        allContacts={persons}
        setPersons={setPersons}
        setNotificationMsg={setNotificationMsg}
        setNotificationStatus={setNotificationStatus}>
      </Contacts>
    </div >
  )
}

export default App
