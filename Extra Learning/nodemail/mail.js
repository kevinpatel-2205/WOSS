const nodemailer = require('nodemailer');

const x = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kevinpatel37592@gmail.com',
        pass: ''
    }
});
const y = {
    from: 'App Name <kevinpatel37592@gmail.com>',
    to: 'jainish2107@gmail.com',
    subject: 'Testing',
    text: 'Hello, Please provide the feedback.!'
};

x.sendMail(y, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});