
var libAccessor = require('libAccessor.js');
driver_schedule = libAccessor.driver_schedule;
driver_step = libAccessor.driver_step;
driver_step_detail = libAccessor.driver_step_detail;

exports.runDeleteMacro = function(jsonObject){
  switch(jsonObject.table){
    case 'c_driver_schedule':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        driver_schedule.delete_all_entries_by_runname(jsonObject.params.run_name);
      }
      break;
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
    case 'c_driver_step_detail':
      if(jsonObject.function_called == 'delete_all_entries_by_runname'){
        driver_step_detail.delete_all_entries_by_runname(jsonObject.params.run_name);
      }
  }
}
