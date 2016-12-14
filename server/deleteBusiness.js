
var libAccessor = require('libAccessor.js');
driver_schedule = libAccessor.driver_schedule;
driver_step = libAccessor.driver_step;
driver_step_detail = libAccessor.driver_step_detail;

/*This runs delete macros based on the specified table, function, and parameters
given.  The table, function, and parameters are provided through a JSON object,
which should be of the following form: {macroID, macroName, macroGroup, author,
params, emergency}, where params is an array of parameters.
*/

//This function runs a delete macro based on the parameters given by the JSON object.
exports.runDeleteMacro = function(jsonObject){
  //switch on the name of the table provided by the JSON object.
  switch(jsonObject.table){
    //If the table is c_driver_schedule, check for the function(s) associated with it.
    case 'c_driver_schedule':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        driver_schedule.delete_all_entries_by_runname(jsonObject.params.run_name);
      }
      break;
    //If the table is c_driver_step, check for the function(s) associated with it.
    case 'c_driver_step':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        driver_step.delete_all_entries_by_runname(jsonObject.params.run_name);
      }
      if(jsonObject.function_called == 'delete_all_entries_by_runname_groupnumber'){
        driver_step.delete_all_entries_by_runname_groupnumber(jsonObject.params.run_name, jsonObject.params.group_number);
      }
      if(jsonObject.function_called == 'delete_all_entries_by_runname_driverstepid'){
        driver_step.delete_all_entries_by_runname_driverstepid(jsonObject.params.run_name, jsonObject.params.driver_step_id);
      }
      break;
    //If the table is c_driver_step_detail, check for the function(s) associated with it.
    case 'c_driver_step_detail':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        driver_step_detail.delete_all_entries_by_runname(jsonObject.params.run_name);
      }
  }
}
