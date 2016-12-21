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
        paramString = "c_driver_schedule: Update schedule start time by run name and auditID., MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", auditID " + jsonObject.params.audit_id + ", schedule start time: " + jsonObject.params.schedule_start_time;
      }
      else if(jsonObject.function_called == 'update_status_code_by_runname_auditid'){
        paramString = "c_driver_schedule: Update status code by run name and auditID. \MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", auditID " + jsonObject.params.audit_id + ", status code: " + jsonObject.params.status_code;
      }
      else if(jsonObject.function_called == 'update_valuation_enddate_by_runname_auditid'){
        paramString = "c_driver_schedule: Update status code by run name and auditID.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + "auditID " + jsonObject.params.status_code + ", valuation end date:" + jsonObject.params.valuation_end_date;
      }
      else if(jsonObject.function_called == 'update_valuation_startdate_by_runname_auditid'){
        paramString = "c_driver_schedule: Update valuation start date by run name and auditID.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + "auditID " + jsonObject.params.status_code + ", valuation start date:" + jsonObject.params.valuation_end_date;
      }
      else if(jsonObject.function_called == 'update_sla_date_time_by_auditid'){
        paramString = "c_driver_schedule: Update sla date and time by auditID.  , MacroID " + jsonObject.macroID + ", Parameters: , auditID " +
        jsonObject.params.audit_id + ", date: " + jsonObject.params.date + ", time:" + jsonObject.params.valuation_end_date;
      }//audit_id, date, time
      else if(jsonObject.function_called == 'update_sla_date_time_by_runname'){
        paramString = "c_driver_schedule: Update sla date and time by run name.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", date: " + jsonObject.params.date + ", time:" + jsonObject.params.time;
      }//run_name, date, time
      else if(jsonObject.function_called == 'update_historical_sla_date_time_by_runname'){
        paramString = "c_driver_schedule: Update historical sla date and time by run name.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", date: " + jsonObject.params.date + ", time:" + jsonObject.params.time;
      }//run_name, date, time
      else if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        paramString = "c_driver_schedule: Delete all entries by runname.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " + jsonObject.params.run_name;
      }
      else{
        paramString = "Macro on c_driver_schedule with an unknown function is pending approval";
      }
      break;

    case 'c_driver_step':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        paramString = "c_driver_step: Delete all entries by runname.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " + jsonObject.params.run_name;
      }
      else if(jsonObject.function_called == 'delete_all_entries_by_runname_groupnumber'){
        paramString = "c_driver_step: Delete all entries by runname and group number.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " + jsonObject.params.run_name +
      ", group number " + jsonObject.params.group_number;
      }//run_name, group_number
      else if(jsonObject.function_called == 'delete_all_entries_by_runname_driverstepid'){
        paramString = "c_driver_step: Delete all entries by runname and driver step id.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " + jsonObject.params.run_name +
      ", driver step ID: " + jsonObject.params.driver_step_id;
      }//run_name, driver_step_id
      else if(jsonObject.function_called == 'update_active_step_indicator_by_driverstepid'){
        paramString = "c_driver_step: Update active step indicator by driver step ID.  , MacroID " + jsonObject.macroID + ", Parameters: driver step ID: " +
        jsonObject.params.driver_step_id + ", active_step_indicator: " + jsonObject.params.active_step_indicator;
      }//driver_step_id, active_step_indicator
      else if(jsonObject.function_called == 'update_active_step_indicator_by_runname_driverstepid'){
        paramString = "c_driver_step: Update active step indicator by run name and driver step ID.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", driver step ID: " + jsonObject.params.driver_step_id + ", active step indicator:" + jsonObject.params.active_step_indicator;
        }//run_name, driver_step_id, active_step_indicator
      else if(jsonObject.function_called == 'update_active_step_indicator_by_runname'){
        paramString = "c_driver_step: Update active step indicator by run name.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", active step indicator:" + jsonObject.params.active_step_indicator;
      }//run_name, active_step_indicator
      else if(jsonObject.function_called == 'update_active_step_indicator_by_runname_groupnumber'){
        paramString = "c_driver_step: Update active step indicator by run name and group number.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", group number " + jsonObject.params.group_number + ", active step indicator:" + jsonObject.params.active_step_indicator;
      }//run_name, group_number, active_step_indicator
      else{
        paramString = "Macro on c_driver_step with an unknown function is pending approval";
      }
      break;

    case 'c_driver_step_detail':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        paramString = "c_driver_step_detail: Delete all entries by runname.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " + jsonObject.params.run_name;
      }//run_name
      else if(jsonObject.function_called == 'update_run_status_code_by_runname_groupnumber'){
        paramString = "c_driver_step_detail: Update run status code by run name and group number.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", group number " + jsonObject.params.group_number + ", run status code:" + jsonObject.params.run_status_code;
      }//run_name, group_number, run_status_code
      else if(jsonObject.function_called == 'update_run_status_code_by_runname_driverstepdetail_id'){
        paramString = "c_driver_step_detail: Update run status code by run name and driver step detail ID.  , MacroID " + jsonObject.macroID + ", Parameters: , run name " +
        jsonObject.params.run_name + ", driver step detail id: " + jsonObject.params.driver_step_detail_id + ", run status code:" + jsonObject.params.run_status_code;
      }//run_name, driver_step_detail_id, run_status_code
      else{
        paramString = "Macro on c_driver_step_detail with an unknown function is pending approval";
      }
      break;
    default:
      paramString = "Macro with unknown table function or parameters is pending approval";
  }

   //Attach a link to the pending macros page of the website.
   paramString = paramString + ".  Click this link to review pending macros.";
   paramString = paramString.link("http://localhost:3000/#/pending/"); //Currently a test link.

  mailOptions.html = paramString;
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    assert(error,null);
    callback(info);
  });
}
