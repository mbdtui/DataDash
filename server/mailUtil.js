//This class is used for sending emails alerts to peers to notify them to review macros.

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
  subject: 'New Macro Pending Approval.  Do Not Reply.', // Subject line
};


exports.sendMail = function(toNames, macroID, parametersArray, callback){
  mailOptions.to = toNames;

  //Build the email body string to show parameters involved in the macro.
  var paramString = "MacroID:" + macroID + " with the following parameters: ";
  for(var i = 0; i < parametersArray.length; i++){
      var paramString = paramString + ", " + parametersArray[i];
   }

   //Attach a link to the pending macros page of the website.
   paramString = paramString + ".  Click this link to review pending macros.";
   paramString = paramString.link("http://www.w3schools.com"); //Currently a test link.

  mailOptions.html = paramString;
  transporter.sendMail(mailOptions, function(error, info){
    assert(error,null);
    callback(info);
  });
}

exports.queueMacro = function(jsonObject){
  //Insert JSON object to application database.
}
/*switch(jsonObject.table){
  case 'c_driver_schedule':
    if(jsonObject.function_called == 'delete_all_entries_by_runname'){

    }
}*/
