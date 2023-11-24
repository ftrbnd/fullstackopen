require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

const app = express();

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
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

// 3.2
app.get('/info', (req, res) => {
    const now = new Date();

    Person.find({}).then(persons => {
        res.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${now}</p>
        `);
    });
});

// 3.3
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json({ person });
    }).catch(err => {
        return res.status(404).json({
            error: 'Person not found'
        });
    });
});

// 3.4
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(404).json({
                error: 'Person not found'
            });
        });
});

// 3.5
app.post('/api/persons', (req, res) => {
    const person = req.body;

    // 3.6
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        });
    }
    // else if (persons.some(p => p.name.toLowerCase() === person.name.toLowerCase())) {
    //     return res.status(400).json({
    //         error: 'Name already exists'
    //     });
    // }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    });

    newPerson.save().then(savedPerson => {
        res.json(savedPerson);
    })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})