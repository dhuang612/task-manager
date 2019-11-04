const sgMail = require('@sendgrid/mail');
//required to access the sendgrid api
const dotenv = require('dotenv').config()


const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'dhuang684@gmail.com',
    from: 'dhuang684@gmail.com',
    subject: 'Test message',
    text: 'This is a test.'
})
