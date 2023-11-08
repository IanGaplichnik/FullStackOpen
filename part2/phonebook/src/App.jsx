import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('Enter new name')

  const addNewName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}> {person.name} </p>)
      }
    </div >
  )
}

export default App
