const db = require('../database/dbConfiguration.js');

module.exports = {
    get: () => {
        let query =  db('companies');
        return query;
    },
    getCompanyById: (companyId) => {
        return db('companies')
            .where('_id', companyId);
    },
    getCompanyByName: (name) => {
        return db('companies')
            .where('name', name);
    },
    getCompanyPlatforms: (id) => {
        return db('companies as c')
            .leftOuterJoin('platForms as p', 'c.id', 'p.companyID')
            .select('*')
            .where('c.id', id);
    },
    insertCompany: (company) => {
        return db('companies')
            .insert(company)
            .then(id => { id: id });
    },
    updateCompanyById: (id, company) => {
        return db('companies')
            .where('_id', id)
            .update(company)
            .then(id => { id: id });
    },
    remove: (id) => {
        return db('companies')
            .where('_id', id)
            .del();
    }
};