require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');

const PORT = process.env.PORT || 5000;

// Imported API Endpoints
const companiesEndpoints = require('./companies/companiesEndpoints.js');
const customersEndpoints = require('./customers/customersEndpoints.js');
const smsEndpoints = require('./sms/smsEndpoints.js');   
const usersEndpoints = require('./users/usersEndpoints.js');
const users = require('./users/usersControllers');

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

server.use((req, res, next) => {
    if (req.originalUrl === '/signin' || req.originalUrl === '/signup' || req.originalUrl === '/user') return next();
    return middleware.validateUser(req, res, next);
});


// imported Endpoints for Companies, Customers and Twilio API
server.use('/companies', companiesEndpoints);
server.use('/customers', customersEndpoints);
server.use('/sms', smsEndpoints);
server.use('', usersEndpoints);


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
                    res.json({ success: true, username });
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


//*******************************  SERVER CONNECTION  ********************************************** */

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`); 
});

