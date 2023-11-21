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

morgan.token('postData', function (req) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  const requestArriveTime = Date.now()
  const date = new Date(requestArriveTime)
  const formattedTime = date.toGMTString()
  Person.find({}).then((persons) => {
    const answer = `<p>Phonebook has info for ${persons.length} people<br/>${formattedTime}</p>`
    response.send(answer)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  const person = request.body
  const newPerson = {
    name: person.name,
    number: person.number,
  }

  Person.findByIdAndUpdate(id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//This error handler is passed as "next" in catch blocks
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
