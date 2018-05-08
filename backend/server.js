require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('/database/dbConfiguration.js');
const session = require('express-session');

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
//     return validateUser(req, res, next);
// });




//*************************** Middlewares *************************************************
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

const hashPassword = (req, res, next) => {
    const {password } = req.body;
    if (!password) {
        res.json({ error: "Please provide password" });
        return;
    }

    bcrypt
        .hash(password, 11)
        .then(hashedPW => {
            req.password = hashedPW;
            next();
        })
        .catch(error => {
            res.json(error);
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

// *******************Route controllers********************************************

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



// ******************* MONGOOSE CONNECTION********************************

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`); 
});

