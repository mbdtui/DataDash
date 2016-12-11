
var libAccessor = require('libAccessor.js');
driver_schedule = libAccessor.driver_schedule;
driver_step = libAccessor.driver_step;
driver_step_detail = libAccessor.driver_step_detail;

/*Takes a JSON object and checks the table, function, and parameters, and runs
  the corresponding query on the data layer.
*/
exports.runUpdateMacro = function(jsonObject){
  switch(jsonObject.table){
    case 'c_driver_schedule':
      if(jsonObject.function_called == 'update_schedule_starttime_by_runname_auditid'){
        driver_schedule.update_schedule_starttime_by_runname_auditid(jsonObject.params.run_name, jsonObject.params.audit_id, jsonObject.params.schedule_start_time);
      }
      if(jsonObject.function_called == 'update_status_code_by_runname_auditid'){
        driver_schedule.update_status_code_by_runname_auditid(jsonObject.params.run_name, jsonObject.params.audit_id, jsonObject.params.status_code);
      }
      if(jsonObject.function_called == 'update_valuation_enddate_by_runname_auditid'){
        driver_schedule.update_valuation_enddate_by_runname_auditid(jsonObject.params.run_name, jsonObject.params.audit_id, jsonObject.params.valuation_end_date);
      }
      if(jsonObject.function_called == 'update_valuation_startdate_by_runname_auditid'){
        driver_schedule.update_valuation_startdate_by_runname_auditid(jsonObject.params.run_name, jsonObject.params.audit_id, jsonObject.params.valuation_start_date);
      }
      if(jsonObject.function_called == 'update_sla_date_time_by_auditid'){
        driver_schedule.update_sla_date_time_by_auditid(jsonObject.params.audit_id, jsonObject.params.date, jsonObject.params.time);
      }
      if(jsonObject.function_called == 'update_sla_date_time_by_runname'){
        driver_schedule.update_sla_date_time_by_runname(jsonObject.params.run_name, jsonObject.params.date, jsonObject.params.time);
      }
      if(jsonObject.function_called == 'update_historical_sla_date_time_by_runname'){
        driver_schedule.update_historical_sla_date_time_by_runname(jsonObject.params.run_name, jsonObject.params.date, jsonObject.params.time);
      }
      break;
    case 'c_driver_step':
      if(jsonObject.function_called == 'update_active_step_indicator_by_driverstepid'){
        driver_step.update_active_step_indicator_by_driverstepid(jsonObject.params.driver_step_id, jsonObject.params.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname_driverstepid'){
        driver_step.update_active_step_indicator_by_runname_driverstepid(jsonObject.params.run_name, jsonObject.params.driver_step_id, jsonObject.params.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname'){
        driver_step.update_active_step_indicator_by_runname(jsonObject.params.run_name, jsonObject.params.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname_groupnumber'){
        driver_step.update_active_step_indicator_by_runname_groupnumber(jsonObject.params.run_name, jsonObject.params.group_number, jsonObject.params.active_step_indicator);
      }
      break;
    case 'c_driver_step_detail':
      if(jsonObject.function_called = 'update_run_status_code_by_runname_groupnumber'){
        driver_step_detail.update_run_status_code_by_runname_groupnumber(jsonObject.params.run_name, jsonObject.params.group_number, jsonObject.params.run_status_code);
      }
      if(jsonObject.function_called = 'update_run_status_code_by_runname_driverstepdetail_id'){
        driver_step_detail.update_run_status_code_by_runname_driverstepdetail_id(jsonObject.parametrs.run_name, jsonObject.params.driver_step_detail_id, jsonObject.params.run_status_code);
      }
  }






















}
