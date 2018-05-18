const db = require('../database/dbConfiguration.js');

module.exports = {
    get: () => {
        return db('invitations');
    },
    getInvitationById: (id) => {
        return db('invitations')
            .where('id', id);
    },
    getInvitationByCustomerId: (id) => {
        return db('invitations')
            .where('customerID', id);
    },
    getInvitationsByCompanyId: (companyId) => {
        // need to write this code, include invitation table access
    },
    insertInvitation: (invitation) => {
        return db('invitations')
            .insert(invitation)
            .then(id => { id: id });
    },
    updateInvitationById: (id, invitation) => {
        return db('invitations')
            .where('id', invitation)
            .then(id => { id: id });
    },
    delete: (id) => {
        return db('invitations')
            .where('id', id)
            .del();
    },
};