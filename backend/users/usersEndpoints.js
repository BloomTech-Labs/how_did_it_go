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