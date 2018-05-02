const User = require('./userSchema');
const { getToken } = require('../auth.js');

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(400).json({ message: err });
    }); 
};

// const userLogin = (req, res) => {
//   const {userName, password } = req.body;

//   User.findOne({ userName })
//     .then(user => {
//       if (user === null) {
//         res.status(422).json({ message: "No user with that username was found!"});
//       }

//       user.checkPassword(password, (nonMatch, hashMatch) => {
//         if (nonMatch !== null) {
//           res.status(422).json({ error: "password doesn't match" });
//           return;
//         } 

//         if (hashMatch) {
//           const token = getToken({ userName: user.userName });
//           res.status(200).json({ token });
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Invalid Username/Password"}, err);
//     });
// };

const userLogin = (req, res) => {
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
      // This is an example of using our User.method from our model.
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

module.exports = {
  getUsers,
  userLogin,
}