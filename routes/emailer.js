const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const { email, password } = require('../config.js');

//gets and sends cat fact
router.post('/catfact', (req, res) => {
  const { emails } = req.body;
  const options = {
    method: 'GET',
    url: 'https://cat-fact.herokuapp.com/facts/',
    headers: {
      'postman-token': 'afea1f76-6e1a-fe2f-e79c-2d4c1db201e7',
      'cache-control': 'no-cache'
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    const object = JSON.parse(body);

    catfact = object.all[Math.floor(Math.random() * 50)].text;
    sendfact(catfact, emails);
    res.send(catfact);
  });
});

const sendfact = (catfact, sendEmail) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: email, // generated ethereal user
        pass: password // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: email, // sender address
      to: sendEmail, // list of receivers
      subject: 'YOUR DAILY CAT FACT!!!', // Subject line
      html: `<b>Here is your daily cat fact!</b><br><br>
      <b>${catfact}</b><br><br>
      <b>🐱 Hope you have a PURRific day!🐱 </b>
 
      ` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};

module.exports = router;
