import axios from "axios"

const baseURL = 'http://localhost:3001/persons'

const addContactDB = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const getAllContactsDB = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const deleteContact = id => {
  const request = axios.delete(`${baseURL}/${id}`)

  return request.then(response => {
    console.log('Deleted successfully', response);
  })
}

const updatePhoneNumber = newObject => {
  const updateURL = `${baseURL}/${newObject.id}`
  const request = axios.put(updateURL, newObject)

  return request.then(response => response.data)
}

export default { addContactDB, getAllContactsDB, deleteContact, updatePhoneNumber }
