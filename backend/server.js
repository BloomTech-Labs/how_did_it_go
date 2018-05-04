const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const { secret } = require('./config');
const port = process.env.PORT || 5000;

const Company = require('./companies/companiesSchema.js');
const Customer = require('./customers/customerSchema.js');
const User = require('./users/userSchema.js');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
    
const corsOptions = {
    credentials: true
};

const server = express();
server.use(bodyParser.json());
server.use(
    session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    }),
);
server.use(cors(corsOptions));

//validateUser middleware will work on all routes, but exempt '/signin' and 'signup'

server.use((req, res, next) => {
    if (req.originalUrl === '/signin' || req.originalUrl === '/signup') return next();
    return validateUser(req, res, next);
});  


//***************************Helper functions*************************************************
// Here is the middleware to validate if user logged in  
const validateUser = (req, res, next) => {
    const { username } = req.session;
    if (!username) {
        res.json({ error: "User is not logged in" });
        return;
    }

    User.findOne({ username }, (err, user) => {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({ error: "User does not exist!"});
        } else {
            req.user = user;
            next();
        }
    });
};


// ****************************************API Endpoints here***********************************
// *****************************************COMPANY ENDPOINTS***********************************
server.get('/companies', (req, res, next) => {
    Company.find({})
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(error => {
            res.status(400).json('Error: ', error);
        });
});
server.get('/companies/:name', (req, res, next) => {
    const { name } = req.params;
    Company.find({ name: name })
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

server.delete('/companies', (req, res) => {
    Company.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'deleted': true});
    });
});

server.put('/companies', (req, res) => {
    Company.findByIdAndUpdate(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'updated': true}); 
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

server.delete('/customers', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'deleted': true});
    });
});

server.put('/customers', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, (err, post) => {
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

// Get Customers by Company Id
server.get('/customers/:id', (req, res, next) => {
    const { id } = req.params;
    Customer.find({ "requestSent.affiliatedCompanyId": id })
        .then(customers => {
            res.status(200).json(customers);
        })
        .catch(error => {
            res.status(400).json('Error: ', error);
        });
});

// Get Customers by Company Name
server.get('/customers/company/:name', (req, res, next) => {
    const { name } = req.params;
    Company.findOne({ name: name })
        .then(company => {
            const id = company._id;
            Customer.find({ "requestSent.affiliatedCompanyId": id })
            .then(customers => {
                res.status(200).json(customers);
            })
            .catch(error => {
                res.status(400).json('Error: ', error);
            });

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


server.delete('/customers', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {res.send(500, err);}
        res.json(200, {'deleted': true});
    });
});


// ***********************************Users EndPoints***********************************************
// ***********************************Route controllers********************************************
const getUsers = (req, res) => {
    
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.send(users);
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Invalid Username/Password' });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: 'No user with that username in our DB' });
        return;
      }
      user.checkPassword(password, (nonMatch, hashMatch) => {
        if (nonMatch !== null) {
          res.status(422).json({ error: 'passwords dont match' });
          return;
        }
        if (hashMatch) {
          req.session.username = username;
          req.user = user;
          res.json({ success: true });
        }
      });
    });
};

const signout = (req, res) => {
    if (!req.session.username) {
        res.json({ error: "User is not logged in!"});
        return;
    }
    req.session.username = null;
    res.json(req.session);
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const userInfo = req.body;

    User.findByIdAndUpdate(id, userInfo)
        .then(user => {
            res.status(200).json({ message: "User updated successfully"});
        })
        .catch(err => {
            res.status(500).json({ message: "Server Error", err});
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(user => {
            res.status(200).json({ message: "User removed successfully"});
        })
        .catch(err => {
            res.status(500).json({ message: "Server Error", err});
        });
};

// ****************************************Users Routes*********************************************************

server.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Server Error!'});
        });
});

server.post('/signin', login);
server.post('/signout', signout);
server.get('/users', getUsers);
server.put('/users/:id', updateUser);
server.delete('/users/:id', deleteUser);


server.listen(port, (req, res) => {
    console.log(`server listening on port ${port}`);
});


