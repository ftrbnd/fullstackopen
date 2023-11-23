const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const persons = [
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
];

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

// 3.7
app.use(morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ];

    // 3.8
    if (req.method === 'POST') {
        log.push(JSON.stringify(req.body));
    }

    return log.join(' ');
  }))

// 3.1
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// 3.2
app.get('/info', (req, res) => {
    const now = new Date();

    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>
    `);
});

// 3.3
app.get('/api/persons/:id', (req, res) => {
    const person = persons[req.params.id - 1];

    if (!person) {
        return res.status(404).json({
            error: 'Person not found'
        });
    }

    res.json({ person });
});

// 3.4
app.delete('/api/persons/:id', (req, res) => {
    const person = persons[req.params.id - 1];

    if (!person) {
        return res.status(404).json({
            error: 'Person not found'
        });
    }

    persons.splice(req.params.id - 1, 1);

    res.status(204).end();
});

// 3.5
app.post('/api/persons', (req, res) => {
    const person = req.body;

    // 3.6
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        });
    } else if (persons.some(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        return res.status(400).json({
            error: 'Name already exists'
        });
    }

    const id = Math.floor(Math.random() * 1000);
    persons.push({ ...person, id });

    res.json({ person });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})