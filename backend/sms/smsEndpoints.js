require('dotenv').config();

const express = require('express');
const smsRouter = express.Router();

const accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.TWILIOPHONENUMBER;
 

smsRouter.post('/:mobile', (req, res) => {
    const { mobile } = req.params;
    const { messageContent } = req.body;
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: messageContent,
        to: mobile ,  // Text this number
        from: twilioNumber //ENV VARIABLE
    })
    .then(message => {
        console.log(message.sid);
        res.status(200).json(message.sid);
    })
    .catch(error => {
        res.status(400).json({ error, messageContent });
    });
});

module.exports = smsRouter();
