const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    requestSent: [
        {
            affiliatedCompanyId: {
                type: String,
            },
            reviewPlatformSent: {
                type: String, 
            },
            clicked: {
                type: Boolean,
                default: false
            },
            reviewScore: {
                type: String
            },
        },
    ],
});

const CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;