const db = require('../database/dbConfiguration.js');

module.exports = {
    get: () => {
        return db('customers');
    },
    getCustomerById: (id) => {
        return db('customers')
            .where('id', id);
    },
    getCustomerByPhoneNumber: (phoneNumber) => {
        return db('customers')
            .where('phoneNumber', phoneNumber)
            .first();
    },
    getCustomerByCompanyId: (companyId) => {
        // need to write this code, include invitation table access
    },
    insert: (customer) => {
        return db('customers')
            .insert(customer)
            .then(id => { id: id });
    },
    updateCustomerById: (id, customer) => {
        return db('customers')
            .where('_id', customer)
            .then(id => { id: id });
    },
    delete: (id) => {
        return db('customers')
            .where('id', id)
            .del();
    },
};