var mail = require('./mailUtil.js');

//Tests that the basic functionality works correctly.
exports.BasicTest = function(){
  var obj = new Object();
  obj.macroID = 99999;
  obj.function_called = 'update_active_step_indicator_by_runname_driverstepid';
  obj.table = 'c_driver_step';
  obj.params = {run_name: 'test_Run_Name', driver_step_id: 'test_Driver_Step_ID', active_step_indicator: 'test_Active_Step_Indicator'}
  mail.sendMail("memarcello@umass.edu", obj);
}

//Tests the case when an unknown table is specified.
exports.UnknownTableTest = function(){
  var obj = new Object();
  obj.macroID = 12345;
  obj.function_called = 'update_active_step_indicator_by_runname_driverstepid';
  obj.table = 'c_unknown_table';
  obj.params = {run_name: 'test_Run_Name', driver_step_id: 'test_Driver_Step_ID', active_step_indicator: 'test_Active_Step_Indicator'}
  mail.sendMail("memarcello@umass.edu", obj);
}

//Tests the case when an unknow function is passed to c_driver_schedule.
exports.Unknown_Function_C_Driver_Schedule_Test = function(){
  var obj = new Object();
  obj.macroID = 12345;
  obj.function_called = 'unknown_test_function';
  obj.table = 'c_driver_schedule';
  obj.params = {run_name: 'test_Run_Name', driver_step_id: 'test_Driver_Step_ID', active_step_indicator: 'test_Active_Step_Indicator'}
  mail.sendMail("memarcello@umass.edu", obj);
}

//Test the case when an unknown function is passed to c_driver_step.
exports.Unknown_Function_C_Driver_Step = function(){
  var obj = new Object();
  obj.macroID = 12345;
  obj.function_called = 'unknown_test_function';
  obj.table = 'c_driver_step';
  obj.params = {run_name: 'test_Run_Name', driver_step_id: 'test_Driver_Step_ID', active_step_indicator: 'test_Active_Step_Indicator'}
  mail.sendMail("memarcello@umass.edu", obj);
}

//Tests the case when an unknown function is passed to c_driver_step_detail
exports.Unknown_Function_C_Driver_Step_Detail = function(){
  var obj = new Object();
  obj.macroID = 12345;
  obj.function_called = 'unknown_test_function';
  obj.table = 'c_driver_step_detail';
  obj.params = {run_name: 'test_Run_Name', driver_step_id: 'test_Driver_Step_ID', active_step_indicator: 'test_Active_Step_Indicator'}
  mail.sendMail("memarcello@umass.edu", obj);
}
