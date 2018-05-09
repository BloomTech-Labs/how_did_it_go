const bcrypt = require('bcrypt');
const users = require('./users/usersControllers');

// Middleware to hash user's password
const hashPassword = (req, res, next) => {
  const { password } = req.body;
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

// Here is the middleware to validate if user logged in  
const validateUser = (req, res, next) => {
  const username = req.session.username;
  if (!username) {
      res.json({ error: "User is not logged in" });
      return;
  }

  users
    .getByUsername(username)
    .then(user => {
      if (!user) {
        res.json({ error: "User does not exist!"});
      } else {
        req.user = user;
        next();
      }
    });
  
  // .findOne({ username }, (err, user) => {
  //     if (err) {
  //         res.json(err);
  //     } else if (!user) {
  //         res.json({ error: "User does not exist!"});
  //     } else {
  //         req.user = user;
  //         next();
  //     }
  // });
};

module.exports = {
  hashPassword,
  validateUser,
};