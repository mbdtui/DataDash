var nodemailer = require('nodemailer');
var assert = require('assert');
var poolConfig = {
  pool: true,
  service: 'gmail',
  secure: true, 
  auth: {
    user: 'dmubmdmtyui@gmail.com',
    pass: 'MyPetName'
  }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(poolConfig);

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log("Invalid SMTP configuration");
    console.log(error);
    process.exit(1);
  } 
});


// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"dmubmdmtyui@gmail.com" <dmubmdmtyui@gmail.com>', // sender address
  subject: 'Do not reply', // Subject line
};

exports.sendMail = function(toNames, html, callback){
  mailOptions.to = toNames;
  mailOptions.html = html;
  transporter.sendMail(mailOptions, function(error, info){
    assert(error, null);
    callback(info);
  });
}

