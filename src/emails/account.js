//required to access the sendgrid api
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name)=> {
    sgMail.send({
        to: email,
        from: 'Dhuang684@gmail.com',
        subject: 'Thanks for joining',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'dhuang684@gmail.com',
        subject: 'Sorry to see you go!',
        text: `We hope you have enjoyed our service ${name}, please let us know if there is anything we could have done to have kept you.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail

}

