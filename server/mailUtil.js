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


exports.sendMail = function(toNames, jsonObject, callback){
  mailOptions.to = toNames;

  var paramString = "";
  switch(jsonObject.table){
    case 'c_driver_schedule':
      if(jsonObject.function_called == 'update_schedule_starttime_by_runname_auditid'){
        paramString = "Update schedule start time by run name and auditID.  MacroID: " + jsonObject.macroID + " with the following parameters: run name: " +
        jsonObject.params.run_name + "  auditID: " + jsonObject.params.audit_id + "  schedule start time: " + jsonObject.params.schedule_start_time;
      }
      if(jsonObject.function_called == 'update_status_code_by_runname_auditid'){
        paramString = "Update status code by run name and auditID.  MacroID: " + jsonObject.macroID + " with the following parameters: run name: " +
        jsonObject.params.run_name + " auditID: " + jsonObject.params.audit_id + " status code: " + jsonObject.params.status_code);
      }
      if(jsonObject.function_called == 'update_valuation_enddate_by_runname_auditid'){
        paramString = "Update status code by run name and auditID.  MacroID: " + jsonObject.macroID + " with the following parameters: run name: " +
        jsonObject.params.run_name + " auditID: " + jsonObject.params.status_code + " valuation end date:" + jsonObject.valuation_end_date);
      }


  }

  //Build the email body string to show parameters involved in the macro.
  // for(var i = 0; i < parametersArray.length; i++){
  //     var paramString = paramString + ", " + parametersArray[i];
  //  }


   //Attach a link to the pending macros page of the website.
   paramString = paramString + ".  Click this link to review pending macros.";
   paramString = paramString.link("http://www.w3schools.com"); //Currently a test link.

  mailOptions.html = paramString;
  transporter.sendMail(mailOptions, function(error, info){
    assert(error,null);
    callback(info);
  });
}


/*switch(jsonObject.table){
  case 'c_driver_schedule':
    if(jsonObject.function_called == 'delete_all_entries_by_runname'){

    }
}*/
