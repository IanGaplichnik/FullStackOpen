import contactsService from '../services/Contacts'

const PersonForm = ({ newName, onNameChange, onNumberChange, newPhoneNumber, addNewContact }) => {

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
