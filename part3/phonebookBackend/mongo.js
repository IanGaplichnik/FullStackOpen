const mongoose = require('mongoose')

const password = process.argv[2]

if (process.argv.length !== 3 && process.argv.length !== 5) {
  const usageMsg1 = "usage: node filename.js MongoDBPassword"
  const usageMsg2 = "usage: node filename.js MongoDBPassword Name PhoneNumber"
  console.log(usageMsg1)
  console.log("or")
  console.log(usageMsg2)
  return
}

const url =
  `mongodb+srv://iangaplichnik:${password}@fso.viogwux.mongodb.net/numberApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(persons => {
      console.log("phonebook:")
      persons.map(person => console.log(person.name, person.number))
      mongoose.connection.close()
    })
  return
}

if (process.argv.length !== 5) {
  const usageMsg = "usage: node filename.js MongoDBPassword Name PhoneNumber"
  console.log(usageMsg)
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
  name: name,
  number: number,
})

person.save().then(person => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
