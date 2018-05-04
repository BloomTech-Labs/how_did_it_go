require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { secret } = require('./config');
const PORT = process.env.PORT || 5000;

const Company = require('./companies/companiesSchema.js');
const Customer = require('./customers/customerSchema.js');
// const User = require('./users/userSchema.js');



const accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.TWILIOPHONENUMBER;
    
const corsOptions = {
    credentials: true
};

const server = express();
server.use(bodyParser.json());
server.use(cors());


// validateToken middleware will work on all routes, but exempt '/signin' and 'signup'
// server.use((req, res, next) => {
//     if (req.originalUrl === '/signin' || req.originalUrl === '/signup') return next();
//     return validateToken(req, res, next);
// });

//***************************Helper functions*************************************************
const getTokenForUser = userObject => {
    // create 10h token
    return jwt.sign(userObject, secret, { expiresIn: 10 * 60 * 60 });
  };
  
const validateToken = (req, res, next) => {
    // take the token up to the server and verify it
    // if no token found in the header, get 422
    // if token not valid, user will be asked to login
    const token = req.headers.authorization;
    if (!token) {
        res.status(422)
            .json({ error: 'No authorization token found on Authorization header' });
            return;
    }
    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res.status(403)
                .json({ error: 'Token invalid, please login', message: authError });
                return;
        }
        // decode jwt and set on the req.decoded, pass to next middleware
        req.decoded = decoded;
        next();
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
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: 'Test text message text (to be replaced by db data',
        to: mobile ,  // Text this number
        from: twilioNumber //ENV VARIABLE
    })
    .then(message => {
        console.log(message.sid);
        res.status(200).json(message.sid);
    })
    .catch(error => {
        res.status(400).json({ error });
    });
});

//************Helper functions*************************************************
// const getTokenForUser = userObject => {
//     // create 10h token
//     return jwt.sign(userObject, secret, { expiresIn: 10 * 60 * 60 });
//   };
  
// const validateToken = (req, res, next) => {
//     // take the token up to the server and verify it
//     // if no token found in the header, get 422
//     // if token not valid, user will be asked to login
//     const token = req.headers.authorization;
//     if (!token) {
//         res.status(422)
//             .json({ error: 'No authorization token found on Authorization header' });
//             return;
//     }
//     jwt.verify(token, secret, (authError, decoded) => {
//         if (authError) {
//             res.status(403)
//                 .json({ error: 'Token invalid, please login', message: authError });
//                 return;
//         }
//         // decode jwt and set on the req.decoded, pass to next middleware
//         req.decoded = decoded;
//         next();
//     });
// };

// *******************Route controllers********************************************

const getUsers = (req, res) => {
    // This handler will not work until a user has sent up a valid JWT
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
          const token = getTokenForUser({ username: user.username });
          res.json({ token });
        }
      });
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

server.get('/users', getUsers);

// ******************* MONGOOSE CONNECTION********************************

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017')
    .then(connection => {
        server.listen(`${PORT}`, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log({ error });
    });
