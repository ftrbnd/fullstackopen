require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// 3.7
app.use(morgan((tokens, req, res) => {
  const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ]

  // 3.8
  if (req.method === 'POST') {
    log.push(JSON.stringify(req.body))
  }

  return log.join(' ')
}))

// 3.1
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    }).catch(err => {
      next(err)
    })
})

// 3.2
app.get('/info', (req, res, next) => {
  const now = new Date()

  Person.find({})
    .then(persons => {
      res.send(`
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${now}</p>
            `)
    }).catch(err => {
      next(err)
    })
})

// 3.3
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json({ person })
      } else {
        res.status(404).end()
      }
    }).catch(err => {
      next(err)
    })
})

// 3.17
app.put('/api/persons/:id', (req, res, next) => {
  const person = req.body

  console.log('new person: ', person)

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'Name or number is missing'
    })
  }

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true, runValidators: true, context: 'query'
  }).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(err => {
    next(err)
  })
})

// 3.4
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    }).catch(err => {
      next(err)
    })
})

// 3.5
app.post('/api/persons', (req, res, next) => {
  const person = req.body

  // 3.6
  if (!person.name || !person.number) {
    return res.status(400).json({
      error: 'Name or number is missing'
    })
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => {
      next(err)
    })
})

// Unknown endpoint handler
app.use((request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
})

// Error handler
app.use((error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})