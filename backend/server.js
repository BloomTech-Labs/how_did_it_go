const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 5000;

const Company = require('./companies/companiesSchema.js');
const Customer = require('./customers/customerSchema.js');

const server = express();
server.use(bodyParser.json());

// API Endpoints here

server.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017')
    .then(connection => {
        server.listen(`${PORT}`, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log('Error thrown: ', error);
    });