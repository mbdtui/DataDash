var aaa = require('./mailUtil.js');
var jsonObject = {
  table: 'c_driver_schedule',
  function_called : 'update_schedule_starttime_by_runname_auditid',
  macroID : '78105',
  params : {
    run_name : 'run_name',
    audit_id : '76',
    status_code : 'PENDING@'
  }
}
aaa.sendMail(" leeyoungkyun77@gmail.com", jsonObject);
