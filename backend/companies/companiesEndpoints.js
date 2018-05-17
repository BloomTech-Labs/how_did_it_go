const express = require('express');
const companies = require('./companiesControllers');
const companiesRouter = express.Router();

companiesRouter.post('', (req, res) => {
    const company = req.body;
    companies.insertCompany(company)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('', (req, res) => {
    companies.get()
        .then(company => {
            res.status(200).json(company);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('/id/:id', (req, res) => {
    const { id } = req.params;
    companies.getCompanyById(id)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('/userid/:userid', (req, res) => {
    const { userid } = req.params;
    companies.getCompanyByUserId(userid)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('/name/:name', (req, res) => {
    const { name } = req.params;
    companies.getCompanyByName(name)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(errror => {
            res.status(400).json(error);
        });
});

companiesRouter.get('/:id/platforms', (req, res) => {
    const { id } = req.params;

    companies
        .getCompanyPlatforms(id)
        .then(data => {
            const detail = {
                name: null,
                address: null,
                contactFirstName: null,
                contactLastName: null,
                contactEmail: null,
                defaultMessage: null,
                paymentIsCurrent: null,
                userID: null,
                platForms: []
            }

            data.forEach(datum => {
                detail.name = datum.name;
                detail.address = datum.address;
                detail.contactFirstName = datum.contactFirstName;
                detail.contactLastName = datum.contactLastName;
                detail.contactEmail = datum.contactEmail;
                detail.defaultMessage = datum.defaultMessage;
                detail.paymentIsCurrent = datum.paymentIsCurrent;
                detail.userID = datum.userID;
                detail.platForms.push({ id: datum.id, url: datum.url, resource: datum.resource });
            });

            res.status(200).json(detail);
        })
        .catch(error => {
            res.status(500).json({message: "Error here", error});
        });
});

companiesRouter.put('/id/:id', (req, res) => {
    const { id } = req.params;
    const company = req.body;
    companies.updateCompanyById(id, company)
        .then(companyId => {
            res.status(200).json(companyId);
        })
        .catch(error => {
            res.status(200).json(error);
        });
});

companiesRouter.delete('/id/:id', (req, res) => {
    const { id } = req.params;
    companies.remove(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

module.exports = companiesRouter;