require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

const usersEndpoints = require('./users/usersEndpoints.js');

const PORT = process.env.PORT || 5000;

// Imported API Endpoints
const companiesEndpoints = require('./companies/companiesEndpoints.js');
const customersEndpoints = require('./customers/customersEndpoints.js');
const smsEndpoints = require('./sms/smsEndpoints.js');   


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




// ****************************************API Endpoints here***********************************
// imported Endpoints for Companies, Customers and Twilio API
server.use('/companies', companiesEndpoints);
server.use('/customers', customersEndpoints);
server.use('/sms', smsEndpoints);

// *******************Route controllers********************************************
// const login = (req, res) => {
//     const { username, password } = req.body;
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         res.status(500).json({ error: 'Invalid Username/Password' });
//         return;
//       }
//       if (user === null) {
//         res.status(422).json({ error: 'No user with that username in our DB' });
//         return;
//       }
//       user.checkPassword(password, (nonMatch, hashMatch) => {
//         if (nonMatch !== null) {
//           res.status(422).json({ error: 'passwords dont match' });
//           return;
//         }
//         if (hashMatch) {
//           req.session.username = username;
//           req.user = user;
//           res.json({ success: true });
//         }
//       });
//     });
// };

// const signout = (req, res) => {
//     if (!req.session.username) {
//         res.json({ error: "User is not logged in!"});
//         return;
//     }
//     req.session.username = null;
//     res.json(req.session);
// };


server.use('', usersEndpoints);
// ******************* MONGOOSE CONNECTION********************************

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`); 
});

