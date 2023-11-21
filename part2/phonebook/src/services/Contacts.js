import axios from "axios";

const baseURL = "/api/persons";

const addContactDB = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const getAllContactsDB = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

// const getAllContactsDB = () => {
//   const request = axios.get(baseURL)
//   const fake = { name: "Hola", number: "040-123123" }
//   return request.then(response => response.data.concat(fake))
// }

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);

  return request.then();
};

const updatePhoneNumber = (newObject) => {
  const updateURL = `${baseURL}/${newObject.id}`;
  const request = axios.put(updateURL, newObject);

  return request.then((response) => response.data);
};

export default {
  addContactDB,
  getAllContactsDB,
  deleteContact,
  updatePhoneNumber,
};
