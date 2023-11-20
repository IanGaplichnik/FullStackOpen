require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT

app.use(express.static('dist'))

app.use(cors())

app.use(express.json())

morgan.token('postData', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(person => person.id === id)

  if (!note) {
    response.status(404).end()
  } else {
    response.json(note)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(note => note.id !== id)

  res.status(204).end()
})

app.get('/info', (request, response) => {
  const requestArriveTime = Date.now()
  const date = new Date(requestArriveTime)
  const formattedTime = date.toGMTString();
  const answer = `<p>Phonebook has info for ${persons.length} people<br/>${formattedTime}</p>`
  response.send(answer)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(person => {
    res.json(person)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
