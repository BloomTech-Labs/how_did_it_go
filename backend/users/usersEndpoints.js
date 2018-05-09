const express = require('express');
const users = require('./usersControllers');
const usersRouter = express.Router();

usersRouter.post('/signup', (req, res) => {
  const user = req.body;
  users
      .insert(user)
      .then(id => {
          res.status(200).json(id);
      })
      .catch(err => {
          res.status(500).json({ message: 'Server Error!'});
      });
});

usersRouter.get('/users', (req, res) => {
  users
      .get()
      .then(users => {
          res.status(200).json(users);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

// userRouter.post('/signin', (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       res.status(500).json({ error: 'Invalid Username/Password' });
//       return;
//     }
//     if (user === null) {
//       res.status(422).json({ error: 'No user with that username in our DB' });
//       return;
//     }
//     user.checkPassword(password, (nonMatch, hashMatch) => {
//       if (nonMatch !== null) {
//         res.status(422).json({ error: 'passwords dont match' });
//         return;
//       }
//       if (hashMatch) {
//         req.session.username = username;
//         req.user = user;
//         res.json({ success: true });
//       }
//     });
//   });
// });


// userRouter.post('/signout', (req, res) => {
//   if (!req.session.username) {
//       res.json({ error: "User is not logged in!"});
//       return;
//   }
//   req.session.username = null;
//   res.json(req.session);
// });


usersRouter.put('/users/:id', (req, res) => {
  const id = req.params.id;

  users
      .update(id, req.body)
      .then(count => {
          if (count > 0) {
              res.status(200).json({ updated: count });
          } else {
              res.status(404).json(null);
          }
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});


usersRouter.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  users
      .remove(id)
      .then(function(count) {
          res.status(200).json({ count });
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

module.exports = usersRouter;