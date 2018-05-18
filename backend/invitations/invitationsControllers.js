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
    getInvitationByCompanyId: (id) => {
        return db('invitations')
            .innerJoin('platForms', 'invitations.platFormID', 'platForms.id')
            .where('platForms.companyID', id);
    },
    getInvitationsByCompanyIdAndCustomerId: (companyid, customerid) => {
        return db('invitations')
            .join('platForms', 'invitations.platFormID', 'platForms.id')
            .where('platForms.companyID', companyid)
            .andWhere('invitations.customerID', customerid);
    },
    insert: (invitation) => {
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