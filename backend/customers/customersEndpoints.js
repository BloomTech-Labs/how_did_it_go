const express = require('express');
const customers = require('./customersControllers');
const customersRouter = express.Router();

customersRouter.post('', (req, res) => {
    const customer = req.body;
    customers.post(customer)
        .then(id => {
            res.status(200).json(id);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

customersRouter.get('', (req, res) => {
    customers.get()
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

customersRouter.get('/id/:id', (req, res) => {
    const { id } = req.params;
    customers.getCustomerById(id)
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(error => {
            res.status(200).json(error);
        });
});

customersRouter.get('/phone/:phone', (req, res) => {
    const { phone }  = req.params;
    customers.getCustomerByPhoneNumber(phone)
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

customersRouter.get('/companyId/:id', (req, res) => {
    const { companyId } = req.params;
    customers.getCustomerByCompanyId(companyId)
        .then(customer => {
            res.status(200).json(customer);
        })
        .catch(error => {
            res.status(200).json(error);
        });
});

customersRouter.put('/id/:id', (req, res) => {
    const { id } = req.params;
    const customer = req.body;
    customers.updateCustomerById(id, customer)
        .then(id => {
            res.status(200).json(id);
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

customersRouter.delete('/id/:id', (req, res) => {
    const { id } = req.params;
    customers.remove(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(200).json(error);
        });
});
module.exports = customersRouter;