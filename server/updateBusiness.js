
/*Takes a JSON object and checks the table, function, and parameters, and runs
  the corresponding query on the data layer.
*/
exports.runUpdateMacro = function(jsonObject){
  switch(jsonObject.table){
    case 'c_driver_schedule':
      if(jsonObject.function_called == 'update_schedule_starttime_by_runname_auditid'){
        driver_schedule.update_schedule_starttime_by_runname_auditid(jsonObject.parameters.run_name, jsonObject.parameters.audit_id, jsonObject.parameters.schedule_start_time);
      }
      if(jsonObject.function_called == 'update_status_code_by_runname_auditid'){
        driver_schedule.update_status_code_by_runname_auditid(jsonObject.parameters.run_name, jsonObject.parameters.audit_id, jsonObject.parameters.status_code);
      }
      if(jsonObject.function_called == 'update_valuation_enddate_by_runname_auditid'){
        driver_schedule.update_valuation_enddate_by_runname_auditid(jsonObject.parameters.run_name, jsonObject.parameters.audit_id, jsonObject.parameters.valuation_end_date);
      }
      if(jsonObject.function_called == 'update_valuation_startdate_by_runname_auditid'){
        driver_schedule.update_valuation_startdate_by_runname_auditid(jsonObject.parameters.run_name, jsonObject.parameters.audit_id, jsonObject.parameters.valuation_start_date);
      }
      if(jsonObject.function_called == 'update_sla_date_time_by_auditid'){
        driver_schedule.update_sla_date_time_by_auditid(jsonObject.parameters.audit_id, jsonObject.parameters.date, jsonObject.parameters.time);
      }
      if(jsonObject.function_called == 'update_sla_date_time_by_runname'){
        driver_schedule.update_sla_date_time_by_runname(jsonObject.parameters.run_name, jsonObject.parameters.date, jsonObject.parameters.time);
      }
      if(jsonObject.function_called == 'update_historical_sla_date_time_by_runname'){
        driver_schedule.update_historical_sla_date_time_by_runname(jsonObject.parameters.run_name, jsonObject.parameters.date, jsonObject.parameters.time);
      }
      break;
    case 'c_driver_step':
      if(jsonObject.function_called == 'update_active_step_indicator_by_driverstepid'){
        driver_step.update_active_step_indicator_by_driverstepid(jsonObject.parameters.driver_step_id, jsonObject.parameters.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname_driverstepid'){
        driver_step.update_active_step_indicator_by_runname_driverstepid(jsonObject.parameters.run_name, jsonObject.parameters.driver_step_id, jsonObject.parameters.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname'){
        driver_step.update_active_step_indicator_by_runname(jsonObject.parameters.run_name, jsonObject.parameters.active_step_indicator);
      }
      if(jsonObject.function_called == 'update_active_step_indicator_by_runname_groupnumber'){
        driver_step.update_active_step_indicator_by_runname_groupnumber(jsonObject.parameters.run_name, jsonObject.parameters.group_number, jsonObject.parameters.active_step_indicator);
      }
      break;
    case 'c_driver_step_detail':
      if(jsonObject.function_called = 'update_run_status_code_by_runname_groupnumber'){
        driver_step_detail.update_run_status_code_by_runname_groupnumber(jsonObject.parameters.run_name, jsonObject.parameters.group_number, jsonObject.parameters.run_status_code);
      }
      if(jsonObject.function_called = 'update_run_status_code_by_runname_driverstepdetail_id'){
        driver_step_detail.update_run_status_code_by_runname_driverstepdetail_id(jsonObject.parametrs.run_name, jsonObject.parameters.driver_step_detail_id, jsonObject.parameters.run_status_code);
      }
  }






















}
