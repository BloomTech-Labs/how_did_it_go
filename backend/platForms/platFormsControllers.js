const db = require('../database/dbConfiguration.js');

module.exports = {
  get: function(id) {
    let query = db('platForms');
    if (id) {
      return query.where('id', id).first();
    }
    return query;
  },

  getByCompanyID: function(companyID) {
    return db('platForms')
      .where('companyID', companyID);
  },

  getByLongUrl: function(longurl) {
    return db('platForms')
      .where('long_url', longurl);
  },

  insert: function(platForm) {
    return db('platForms')
      .insert(platForm)
      //.then(ids => ({ id: ids[0] }));
  },

  update: function(id, platForm) {
    return db('platForms')
      .where('id', id)
      .update(platForm);
  },

  remove: function(id) {
    return db('platForms')
      .where('id', id)
      .del();
  },
};