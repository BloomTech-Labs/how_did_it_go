require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');

const usersEndpoints = require('./users/usersEndpoints.js');
const users = require('./users/usersControllers');

const PORT = process.env.PORT || 5000;

const accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.TWILIOPHONENUMBER;
    
const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(
    session({
    secret: process.env.SESSION_TOKEN,
    resave: true,
    saveUninitialized: true,
    }),
);

/**PLEASE DON'T DELETE THE COMMAND OUT CODE BELOW, IT IS THE AUTH MIDDLEWARE, WILL USE AFTER WE TEST ALL ENDPOINTS */
//validateUser middleware will work on all routes, but exempt '/signin' and 'signup'

// server.use((req, res, next) => {
//     if (req.originalUrl === '/signin' || req.originalUrl === '/signup') return next();
//     return middleware.validateUser(req, res, next);
// });


// ****************************************API Endpoints here***********************************
// *****************************************COMPANY ENDPOINTS***********************************
server.get('/companies', (req, res, next) => {
    Company.find({})
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});
server.get('/companies/name/:name', (req, res, next) => {
    const { name } = req.params;
    Company.find({ name: name })
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});

server.get('/companies/id/:id', (req, res, next) => {
    const { id } = req.params;
    Company.findOne({ _id: id })
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});


server.post('/companies', (req, res, next) => {
    let newCompany = new Company(req.body);
    newCompany.save()
        .then(savedCompany => {
            res.status(200).json("Successfully Added");
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});

server.put('/companies/id/:id', (req, res) => {
    const { id } = req.params;
    updatedCompany = req.body;
    Company.findByIdAndUpdate(id, updatedCompany,  (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'updated': true}); 
    });
});

server.delete('/companies', (req, res) => {
    Company.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'deleted': true});
    });
});


// ********************************CUSTOMERS ENDPOINTS******************************************************
server.get('/customers', (req, res, next) => {
    Customer.find({})
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});

// Get Customers by Phone Number
server.get('/customers/phone/:number', (req, res, next) => {
    const { number } = req.params;
    Customer.findOne({ "phoneNumber": number })
    .then(customers => {
        res.status(200).json(customers);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
});

// Get Customers by Company Id
server.get('/customers/companyid/:id', (req, res, next) => {
    const { id } = req.params;
    Customer.find({ "requestSent.affiliatedCompanyId": id })
    .then(customers => {
        res.status(200).json(customers);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
});

// Get Customers by Company Name
server.get('/customers/companyname/:name', (req, res, next) => {
    const { name } = req.params;
    Company.findOne({ name: name })
    .then(company => {
        const id = company._id;
        Customer.find({ "requestSent.affiliatedCompanyId": id })
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(error => {
            res.status(400).json({ error });
        });
        
    })
    .catch(error => {
        res.status(400).json({ error });
    });
});

server.post('/customers', (req, res, next) => {
    let newCustomer = new Customer(req.body);
    newCustomer.save()
        .then(savedCustomer => {
            res.status(200).json("Customer added!");
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});

server.put('/customers/id/:id', (req, res) => {
    const { id } = req.params;
    let updatedCustomer = req.body;
    Customer.findByIdAndUpdate(id, updatedCustomer, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'updated': true}); 
    });
});

server.delete('/customers', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'deleted': true});
    });
});


// ***********************************SMS EndPoints***********************************************
// SMS endpoint
server.post('/sms/:mobile', (req, res) => {
    const { mobile } = req.params;
    const { messageContent } = req.body;
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: messageContent,
        to: mobile ,  // Text this number
        from: twilioNumber //ENV VARIABLE
    })
    .then(message => {
        console.log(message.sid);
        res.status(200).json(message.sid);
    })
    .catch(error => {
        res.status(400).json({ error, messageContent });
    });
});



// ******************* SIGN IN & SIGN OUT ********************************************

server.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.json({ error: "Username undefined" });
    }

    users
        .getByUsername(username)
        .then(user => {
            if (!user) {
                res.json({ error: "User does not exist!"});
                return;
            }
            
            const hashedPW = user.password;
            bcrypt
                .compare(password, hashedPW)
                .then(result => {
                    if (!result) throw new Error();
                    req.session.username = username;
                    req.user = user;
                    res.json({ success: true });
                })  
                .catch(err => res.json(err));
        });
});

server.post('/signout', (req, res) => {
  if (!req.session.username) {
      res.json({ error: "User is not logged in!"});
      return;
  }
  req.session.username = null;
  res.json(req.session);
});

server.use('', usersEndpoints);

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`); 
});

