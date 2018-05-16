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

companiesRouter.get('id/:id', (req, res) => {
    const { id } = req.params;
    companies.getCompanyById(id)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('userid/:userid', (req, res) => {
    const { userid } = req.params;
    companies.getCompanyByUserId(userid)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

companiesRouter.get('name/:name', (req, res) => {
    const { name } = req.params;
    companies.getCompanyByName(name)
        .then(company => {
            res.status(200).json(company);
        })
        .catch(errror => {
            res.status(400).json(error);
        });
});

companiesRouter.put('id/:id', (req, res) => {
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

companiesRouter.delete('id/:id', (req, res) => {
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