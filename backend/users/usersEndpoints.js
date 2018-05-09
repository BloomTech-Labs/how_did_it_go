const express = require('express');
const bcrypt = require('bcrypt');
const users = require('./usersControllers');
const usersRouter = express.Router();
const middleware = require('../middleware');

usersRouter.post('/signup', middleware.hashPassword, (req, res) => {
  const user = {};
  user.username = req.body.username;
  user.password = req.password;

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

// usersRouter.post('/signin', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (!username) {
//         res.json({ error: "Username undefined" });
//     }

//     users
//         .getByUsername(username)
//         .then((err, user) => {
//             if (err) {
//                 res.json(err);
//                 return;
//             } else if (!user) {
//                 res.json({ error: "User does not exist!"});
//                 return;
//             }
            
//             const hashedPW = user.password;
//             console.log(hashedPW);
//             bcrypt
//                 .compare(password, hashedPW)
//                 .then(res => {
//                     if (!res) throw new Error();
//                     req.session.username = username;
//                     req.user = user;
//                 })
//                 .then(() => {
//                     res.json({ success: true });
//                 })
//                 .catch(err => {
//                     res.json(err);
//                 });
//         });
// });


// usersRouter.post('/signout', (req, res) => {
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