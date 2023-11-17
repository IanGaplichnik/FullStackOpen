const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))

app.use(cors())

app.use(express.json())

morgan.token('postData', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

const generateId = () => {
  const maxId = persons.length > 0 ?
    Math.max(...persons.map(person => person.id)) : 0

  return maxId + 1
}

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

  if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
