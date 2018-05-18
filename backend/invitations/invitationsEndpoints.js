const express = require('express');
const invitations = require('./invitationsControllers');
const invitationsRouter = express.Router();

invitationsRouter.post('', (req, res) => {
    const invitation = req.body;
    invitations.post(invitation)
        .then(id => {
            res.status(200).json(id);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

invitationsRouter.get('', (req, res) => {
    invitations.get()
        .then(invites => {
            res.status(200).json(invites);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});
invitationsRouter.get('/customerid/:id', (req, res) => {
    const { id } = req.params;
    invitations.getInvitationByCustomerId(id)
        .then(invites => {
            res.status(200).json(invites);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = invitationsRouter;