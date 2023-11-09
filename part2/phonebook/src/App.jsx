import { useState, useEffect } from 'react'
import axios from 'axios'

import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contact'
import contactsService from './services/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter new name')
  const [newPhoneNumber, setNewPhoneNumber] = useState('+358')
  const [filterKey, setNewFilterKey] = useState('')

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
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filterKey={filterKey} onChangeHandler={handleChange(setNewFilterKey)}></SearchFilter>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        onNameChange={handleChange(setNewName)}
        onNumberChange={handleChange(setNewPhoneNumber)}
        newPhoneNumber={newPhoneNumber}
        persons={persons}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
      >
      </PersonForm>
      <h2>Numbers</h2>
      <Contacts contactsToDisplay={contactsToDisplay}></Contacts>
    </div >
  )
}

export default App
