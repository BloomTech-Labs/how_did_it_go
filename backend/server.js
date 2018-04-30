const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const PORT = 5000;

const Company = require('./companies/companiesSchema.js');
const Customer = require('./customers/customerSchema.js');

const server = express();
server.use(cors());
server.use(bodyParser.json());

// API Endpoints here
// COMPANY ENDPOINTS
server.get('/companies', (req, res, next) => {
    Company.find({})
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(error => {
            res.status(400).json('Error: ', error);
        });
});

server.post('/companies', (req, res, next) => {
    let newCompany = new Company();
    newCompany.name             = req.body.name;
    newCompany.address          = req.body.address;
    newCompany.contactFirstName = req.body.contactFirstName;
    newCompany.contactLastName  = req.body.contactLastName;
    newCompany.contactEmail     = req.body.contactEmail;
    newCompany.paymentIsCurrent = req.body.paymentIsCurrent;

    newCompany.save()
        .then(savedCompany => {
            res.status(200).json("Successfully Added");
        })
        .catch(error => {
            res.json(error.message);
        });
});

// CUSTOMERS ENDPOINTS
server.get('/customers', (req, res, next) => {
    Customer.find({})
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(error => {
            res.status(400).json('Error: ', error);
        });
});

server.post('/customers', (req, res, next) => {
    let newCustomer = new Customer();
    newCustomer.firstName   = req.body.firstName;
    newCustomer.lastName    = req.body.lastName;
    newCustomer.phoneNumber = req.body.phoneNumber;
    newCustomer.requestSent = req.body.requestSent;

    newCustomer.save()
        .then(savedCustomer => {
            res.status(200).json("Customer added!");
        })
        .catch(error => {
            res.json(error.message);
        });
});


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