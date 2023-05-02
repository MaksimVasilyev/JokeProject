const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const sendEmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      secure: true,
    },
  });
  //2) Define the email options
  const mailOptions = {
    from: 'myservermail1@rambler.ru',    
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  //3) Actually send the email
  try {
     await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }

};

module.exports = sendEmail;