
/*
	- PostgreSQL server, which need to be downloaded and installed, is required to be running prior to running this program.
	- Use 'LibDBLoader.js' in the directory 'lib_mockDB_loader' to load data into the database before calling this accessor.
	- Make a new query call with the statement:
		client.query('SQL query statement');
	- The result is a JSON object.
*/

var pg = require('pg');

var PostgreSQL_config = {
	user: 'postgres',
	password: 'abc12345',
	database: 'postgres',
	host: 'localhost',
	port: 5432,
};

var client = new pg.Client(PostgreSQL_config);

// Callback receive results from the query.
function executeQuery(query_string, cb){
	// open connection to database.
	client.connect(function (err) {
		if (err) {
			console.log(err);
			cb(err, null);
		}
		else{		
			client.query(query_string, function(err, result) {				
				client.end();
				if(err) {
					console.log("Query error!");
				}
				else {
					console.log('Query results:');
					for(var i=0; i < result.rows.length; i++) {
						console.log(JSON.stringify(result.rows[i])+'\n');
					}			
				}
				cb(err, result);
			});
		}
	});
}

// Interface for the table 'c_driver_schedule'.
var driver_schedule = {
	delete_all_entries: function(run_name, cb) {},
	update_schedule_starttime_by_runname_auditid: function(run_name, audit_id, schedule_start_time, cb) {},
	update_status_code_by_runname_auditid: function(run_name, audit_id, status_code, cb) {},
	update_valuation_enddate_by_runname_auditid: function(run_name, audit_id, valuation_end_date, cb) {},
	update_valuation_startdate_by_runname_auditid: function(run_name, audit_id, valuation_start_date, cb) {},
	update_sla_date_time_by_auditid: function(audit_id, date, time, cb) {},
	update_sla_date_time_by_runname: function(run_name, date, time, cb) {},
	update_historical_sla_date_time_by_runname: function(run_name, date, time, cb) {}
};

// Interface for the table 'c_driver_step'.
var driver_step = {
	delete_all_entries_by_runname: function(run_name, cb){},
	delete_all_entries_by_runname_groupnumber: function(run_name, group_number, cb){},
	delete_all_entries_by_runname_driverstepid: function(run_name, driver_step_id, cb){},
	update_active_step_indicator_by_driverstepid: function(driver_step_id, active_step_indicator, cb){},
	update_active_step_indicator_by_runname_driverstepid: function(run_name, driver_step_id, active_step_indicator, cb){},
	update_active_step_indicator_by_runname: function(run_name, active_step_indicator, cb){},
	update_active_step_indicator_by_runname_groupnumber: function(run_name, group_number, active_step_indicator, cb){},
};

// Interface for the table 'c_driver_step_detail'.
var driver_step_detail = {
	delete_all_entries_by_runname: function(run_name, cb){},
	update_run_status_code_by_runname_groupnumber: function(run_name, group_number, run_status_code, cb){},
	update_run_status_code_by_runname_driverstepdetail_id: function(run_name, driver_step_detail_id, run_status_code, cb){},

};

exports.driver_schedule = driver_schedule;
exports.driver_step = driver_schedule;
exports.driver_step_detail = driver_schedule;


// Test modified sample query.
function testQuery1(a, cb) {
	client.query("SELECT run_stts_cd, b.STEP_NME, b.PRMTR_TXT, a.run_nme, a.grp_nbr, a.run_order_nbr, a.run_stts_cd, a.run_start_dtm, a.run_end_dtm,a.run_end_dtm - a.run_start_dtm As run_time_diff, b.STEP_NME"+
			" FROM c_driver_step_detail a, c_driver_step b" +
			" WHERE a.DRVR_STEP_ID = b.DRVR_STEP_ID AND a.app_nme = 'EDW' and a.RUN_NME = 'S_2_O_CL_FA_ISO_NRT'"+
			" --AND a.run_stts_cd <> 'S'"+
			" --AND a.RUN_STTS_CD = 'R'"+
			" order by a.run_nme, a.grp_nbr, a.run_order_nbr;", function(err, result) {
				if(err) {
					console.log("Query error!");
				}
				else {
					console.log('Query results:');
					for(var i=0; i < result.rows.length; i++) {
						console.log(JSON.stringify(result.rows[i])+'\n');
					}
					cb();				
				}
			});
}