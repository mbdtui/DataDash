var libAccessor = require('../libAccessor.js');
var LibDBLoader = require('../lib_mockDB_loader/LibDBLoader.js');
var driver_step = libAccessor.driver_step;
var driver_schedule = libAccessor.driver_schedule;
var driver_step_detail = libAccessor.driver_step_detail;
var viewRunStatusCode = libAccessor.viewRunStatusCode;
var executeQuery = libAccessor.executeQuery;

const util = require('util');

// driver_schedule.update_historical_sla_date_time_by_runname('ARMS_TO_ODS_SETUP','2016-12-4', '11:11:11', function(err, result){
// 	if(err) {
// 		console.log(err);
// 	}
// 	else {
// 		console.log(JSON.stringify(result));
// 	}
// });
// LibDBLoader.loadMockDB();

function test_driver_schedule_update_schedule_starttime_by_runname_auditid(cb){
	console.log('*** Test driver_schedule.update_schedule_starttime_by_runname_auditid: function(run_name, audit_id, schedule_start_time, cb)');
	var run_nme = 'nice_csat_ref';
	var audt_id = 48;
	var expected_schdl_start_dtm = '00:03:06.1';
	console.log('run_name=' + run_nme);
	console.log('audit_id=' + audt_id);
	console.log('expected schedule_start_time=' + expected_schdl_start_dtm);

	executeQuery(util.format("select * from c_driver_schedule"+
		" where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

		var old_schdl_start_dtm = result.rows[0].schdl_start_dtm;
		driver_schedule.update_schedule_starttime_by_runname_auditid(run_nme, audt_id, expected_schdl_start_dtm, function(err, result) {
			
			executeQuery(util.format("select * from c_driver_schedule"+
				" where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

				var new_schdl_start_dtm = result.rows[0].schdl_start_dtm;

				if(new_schdl_start_dtm === expected_schdl_start_dtm){
					console.log('===> PASSED');
				} else {
					console.log('===> FAILED'+
						'\n\t Old value=' + old_schdl_start_dtm +
						'\n\t Expected value=' + expected_schdl_start_dtm +
						'\n\t New value=' + new_schdl_start_dtm);
				}
				console.log();
			});
		});

	});
}

function test_driver_step_delete_all_entries_by_runname(cb){
	console.log('*** Test driver_step.delete_all_entries_by_runname: function(run_name, cb)');
	var run_name = 'V_2_O';
	console.log('run_name=' + run_name);

	executeQuery("select count(*) from c_driver_step;", function(err, result) {

		var number_of_rows_before_deletion = result.rows[0].count;

		executeQuery("select count(*) from c_driver_step where run_nme='" + run_name + "';", function(err, result){

			var number_of_rows_must_be_deleted = result.rows[0].count;

			driver_step.delete_all_entries_by_runname(run_name, function(err, result) {

				console.log(JSON.stringify(result));
				executeQuery("select count(*) from c_driver_step;", function(err, result) {
					
					var number_of_rows_after_deletion = result.rows[0].count;
					if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
						console.log('===> PASSED');
					}else{
						console.log('===> FAILED'+
							'\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
							'\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
							'\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
					}
					console.log();
					cb();
				});
			});				
		});
	});
}


// LibDBLoader.reloadDriverSchedule('../lib_mockDB_loader/LibDataLogs');
// LibDBLoader.reloadDriverStep('../lib_mockDB_loader/LibDataLogs');
// LibDBLoader.reloadDriverStepDetail('../lib_mockDB_loader/LibDataLogs');
// LibDBLoader.loadMockDB('../lib_mockDB_loader/LibDataLogs');
// Call tests.
test_driver_step_delete_all_entries_by_runname(()=>{
	test_driver_schedule_update_schedule_starttime_by_runname_auditid(
		function(){}
	)
});

