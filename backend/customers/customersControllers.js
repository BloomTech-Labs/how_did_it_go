const db = require('../database/dbConfig.js');

module.exports = {
    get: () => {
        return db('customers');
    },
    getCustomerById: (id) => {
        return db('customers')
            .where('_id', id);
    },
    getCustomerByPhoneNumber: (phoneNumber) => {
        return db('customers')
            .where('phoneNumber', phoneNumber);
    },
    insertCustomer: (customer) => {
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
            .where('_id', id)
            .del();
    },
};