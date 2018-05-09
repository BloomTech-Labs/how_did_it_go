const db = require('../database/dbConfiguration.js');

module.exports = {
  get: function(id) {
    let query = db('users');
    if (id) {
      query.where('id', id).first();
    }
    return query;
  },

  getByUsername: function(username) {
    return db('users')
      .where('username', username).first();
  },

  insert: function(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  },

  update: function(id, user) {
    return db('users')
      .where('id', id)
      .update(user);
  },

  remove: function(id) {
    return db('users')
      .where('id', id)
      .del();
  },
};