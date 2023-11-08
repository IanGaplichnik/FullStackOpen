import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('Enter new name')
  const [newPhoneNumber, setNewPhoneNumber] = useState('+358')
  const [filterKey, setNewFilterKey] = useState('')

  const addNewContact = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (persons.some(person => person.phone === newPhoneNumber)) {
      alert(`${newPhoneNumber} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, phone: newPhoneNumber }))
    setNewName('')
    setNewPhoneNumber('+358')
  }

  const handleChange = (setFunction) => (event) => setFunction(event.target.value)

  const contactsToDisplay = persons.filter(person => person.name.toLowerCase().startsWith(filterKey.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={filterKey} onChange={handleChange(setNewFilterKey)} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange(setNewName)} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handleChange(setNewPhoneNumber)} />
        </div>
        <div>
          <button type="submit" onClick={addNewContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        contactsToDisplay.map(person => <p key={person.name}> {person.name} {person.phone} </p>)
      }
    </div >
  )
}

export default App
