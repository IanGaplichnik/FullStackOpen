const express = require('express')
const app = express()

app.use(express.json())

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
  console.log("/info");
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
  console.log(body)

  if (!body.name) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.some(person => person.name === body.name)) {
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
