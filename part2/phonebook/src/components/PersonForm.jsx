const PersonForm = ({ newName, onNameChange, onNumberChange, newPhoneNumber, persons, setPersons, setNewName, setNewPhoneNumber }) => {

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