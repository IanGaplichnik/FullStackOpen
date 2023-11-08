const Contacts = ({ contactsToDisplay }) =>
  contactsToDisplay.map(person =>
    <p key={person.name}> {person.name} {person.phone} </p>)

export default Contacts