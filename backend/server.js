require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Imported API Endpoints
const companiesEndpoints = require('./companies/companiesEndpoints.js');
const customersEndpoints = require('./customers/customersEndpoints.js');
const platFormsEndpoints = require('./platForms/platFormsEndpoints.js');
const smsEndpoints = require('./sms/smsEndpoints.js');   
const usersEndpoints = require('./users/usersEndpoints.js');
const users = require('./users/usersControllers');


const server = express();


// Serve static files from the React app
server.use(express.static(path.join(__dirname, '../frontend/build')));


server.use(bodyParser.json());


//config CORS w/ Dynamic Origin

const whitelist = ['http://localhost:3000', 'https://lambda-labs-how-did-it-go.herokuapp.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            corsOptions.origin = origin;
        } else {
            callback (new Error('Not allowed by CORS'))
        }
    },

    credentials: true,
};
server.use(cors(corsOptions));



// set credentials: true: let auth pass cookie down

// server.use(cors({origin: 'http://localhost:3000',
//     credentials: true
// }));


server.use(
    session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
    }),
);


//validateUser middleware will work on all routes, but exempt '/signin' and 'signup'

server.use((req, res, next) => {
    if (req.originalUrl === '/signin' || req.originalUrl === '/signup') return next();
    return middleware.validateUser(req, res, next);
});


// imported Endpoints for Companies, Customers and Twilio API
server.use('', usersEndpoints);
server.use('/companies', companiesEndpoints);
server.use('/customers', customersEndpoints);
server.use('/platForms', platFormsEndpoints);
server.use('/sms', smsEndpoints);



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

            const hashedPW = user.password;
            bcrypt
                .compare(password, hashedPW)
                .then(result => {
                    if (!result) throw new Error();
                    req.session.username = username;
                    req.user = user;
                    res.json({ success: true, username });
                })  
                .catch(err => res.json({ message: "Failed to sign you in", err}));
        })
        .catch(error => res.json({message: "Error happens when try to sign you in", error }));
});

server.post('/signout', (req, res) => {
  req.session.username = null;
  res.json(req.session);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'../frontend/build/index.html'));
  });
  


//*******************************  SERVER CONNECTION  ********************************************** */

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`Server running on ${PORT}`); 
});

