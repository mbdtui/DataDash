
/*
	- PostgreSQL server, which need to be downloaded and installed, is required to be running prior to running this program.
	- Use 'LibDBLoader.js' in the directory 'lib_mockDB_loader' to load data into the database before calling this accessor.
	- Make a new query call with the statement:
		client.query('SQL query statement');
	- The result is a JSON object.
*/

var pg = require('pg');

var resetPostgreDB = require('./lib_mockDB_loader/LibDBLoader.js').loadMockDB;

// Reset database.
resetPostgreDB('./lib_mockDB_loader/LibDataLogs');

var PostgreSQL_config = {
	user: 'postgres',
	password: 'abc12345',
	database: 'postgres',
	host: 'localhost',
	port: 5432,
};

// Create a client to connect to the database.
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
	delete_all_entries_by_runname: function(run_name, cb) {
        executeQuery('DELETE FROM c_driver_schedule WHERE run_nme=\'' + run_name + '\' RETURNING *;', cb);
	},
	update_schedule_starttime_by_runname_auditid: function(run_name, audit_id, schedule_start_time, cb) {
		executeQuery('UPDATE c_driver_schedule SET schdl_start_dtm=\'' + schedule_start_time
			+ '\' WHERE audt_id =\'' + audit_id + '\' AND run_nme=\'' + run_name + '\' RETURNING *;', cb);
	},
	update_status_code_by_runname_auditid: function(run_name, audit_id, status_code, cb) {
        executeQuery('UPDATE c_driver_schedule SET stts_cd=\'' + status_code
            + '\' WHERE audt_id =\'' + audit_id + '\' AND run_nme=\'' + run_name + '\' RETURNING *;', cb);
	},
	update_valuation_enddate_by_runname_auditid: function(run_name, audit_id, valuation_end_date, cb) {
        executeQuery('UPDATE c_driver_schedule SET vlutn_end_dtm=\'' + valuation_end_date
            + '\' WHERE run_nme =\'' + run_name + '\' AND audt_id=\'' + audit_id + '\' RETURNING *;', cb);
	},
	update_valuation_startdate_by_runname_auditid: function(run_name, audit_id, valuation_start_date, cb) {
        executeQuery('UPDATE c_driver_schedule SET vlutn_start_dtm=\'' + valuation_start_date
            + '\' WHERE run_nme =\'' + run_name + '\' AND audt_id=\'' + audit_id + '\' RETURNING *;', cb);
	},
	update_sla_date_time_by_auditid: function(audit_id, date, time, cb) {
        executeQuery('UPDATE c_driver_schedule SET sla_date=\'' + date
            + '\', sla_time=\'' + time + '\' WHERE audt_id =\'' + audit_id + '\' RETURNING *;', cb);
	},
	update_sla_date_time_by_runname: function(run_name, date, time, cb) {
        executeQuery('UPDATE c_driver_schedule SET sla_date=\'' + date
            + '\', sla_time=\'' + time + '\' WHERE run_nme =\'' + run_name + '\' RETURNING *;', cb);
	},
	update_historical_sla_date_time_by_runname: function(run_name, date, time, cb) {
        executeQuery('UPDATE c_driver_schedule_h SET sla_date=\'' + date
            + '\', sla_time=\'' + time + '\' WHERE run_nme =\'' + run_name + '\'', cb);
	}
};

// Interface for the table 'c_driver_step'.
var driver_step = {
	delete_all_entries_by_runname: function(run_name, cb){
		executeQuery('DELETE FROM c_driver_step WHERE run_nme=\'' + run_name + '\' RETURNING *;', cb);
	},
	delete_all_entries_by_runname_groupnumber: function(run_name, group_number, cb){
		executeQuery('DELETE FROM c_driver_step WHERE run_nme=\'' + run_name + '\' AND grp_nbr=\'' + group_number + '\' RETURNING *;', cb);
	},
	delete_all_entries_by_runname_driverstepid: function(run_name, driver_step_id, cb){
		executeQuery('DELETE FROM c_driver_step WHERE run_nme=\'' + run_name + '\' AND drvr_step_id=\'' + driver_step_id + '\' RETURNING *;', cb);
	},
	update_active_step_indicator_by_driverstepid: function(driver_step_id, active_step_indicator, cb){
		executeQuery('UPDATE c_driver_step SET actv_step_ind = ' + active_step_indicator +' WHERE drvr_step_id = ' + driver_step_id + ';');
	},
	update_active_step_indicator_by_runname_driverstepid: function(run_name, driver_step_id, active_step_indicator, cb){
		executeQuery('UPDATE c_driver_step SET actv_step_ind = ' + active_step_indicator +' WHERE drvr_step_id = ' + driver_step_id + ' AND run_nme=\'' + run_name + '\';');
	},
	update_active_step_indicator_by_runname: function(run_name, active_step_indicator, cb){
		executeQuery('UPDATE c_driver_step SET actv_step_ind = ' + active_step_indicator +' WHERE run_nme = \'' + run_name + '\';');
	},
	update_active_step_indicator_by_runname_groupnumber: function(run_name, group_number, active_step_indicator, cb){
		executeQuery('UPDATE c_driver_step SET actv_step_ind = ' + active_step_indicator +' WHERE run_nme = \'' + run_name + '\' AND grp_nbr=' + group_number + ';');
	},
};

// driver_schedule.update_historical_sla_date_time_by_runname('ARMS_TO_ODS_SETUP','2016-12-4', '11:11:11', function(err, result){
// 	if(err) {
// 		console.log(err);
// 	}
// 	else {
// 		console.log(JSON.stringify(result));
// 	}
// });

// driver_step.delete_all_entries_by_runname('V_2_O', function(err, result) {
// 	if(err) {
// 		console.log('Error occurs!');
// 	}
// 	else {
// 		console.log(JSON.stringify(result));
// 	}
// });

// Interface for the table 'c_driver_step_detail'.
var driver_step_detail = {
	delete_all_entries_by_runname: function(run_name, cb){		
		executeQuery('DELETE FROM c_driver_step_detail WHERE run_nme=\'' + run_name + '\' RETURNING *;', cb);
	},
	update_run_status_code_by_runname_groupnumber: function(run_name, group_number, run_status_code, cb){
		executeQuery('UPDATE c_driver_step_detail SET run_stts_cd = ' + run_status_code +' WHERE run_nme = \'' + run_name + '\' AND grp_nbr=' + group_number + ';');
	},
	update_run_status_code_by_runname_driverstepdetail_id: function(run_name, driver_step_detail_id, run_status_code, cb){
		executeQuery('UPDATE c_driver_step_detail SET run_stts_cd = ' + run_status_code +' WHERE run_nme = \'' + run_name + '\' AND drvr_step_dtl_id' + driver_step_detail_id + ';');
	},
};

exports.driver_schedule = driver_schedule;
exports.driver_step = driver_schedule;
exports.driver_step_detail = driver_schedule;


// Test modified sample query.
function viewRunStatusCode(app_name, run_name, run_status_code, cb) {
	var query = "SELECT run_stts_cd, b.STEP_NME, b.PRMTR_TXT, a.run_nme, a.grp_nbr, a.run_order_nbr, a.run_stts_cd, a.run_start_dtm, a.run_end_dtm,a.run_end_dtm - a.run_start_dtm As run_time_diff, b.STEP_NME"+
			" FROM c_driver_step_detail a, c_driver_step b" +
			" WHERE a.DRVR_STEP_ID = b.DRVR_STEP_ID AND a.app_nme = '" + app_name + "' and a.RUN_NME = '" + run_name + "'";
	if(run_status_code === null) {
		query += " AND a.run_stts_cd = '" + run_status_code+ "'",
	}
	query += " order by a.run_nme, a.grp_nbr, a.run_order_nbr;";

	client.query(query, function(err, result) {
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

// "SELECT run_stts_cd, b.STEP_NME, b.PRMTR_TXT, a.run_nme, a.grp_nbr, a.run_order_nbr, a.run_stts_cd, a.run_start_dtm, a.run_end_dtm,a.run_end_dtm - a.run_start_dtm As run_time_diff, b.STEP_NME"+
// 			" FROM c_driver_step_detail a, c_driver_step b" +
// 			" WHERE a.DRVR_STEP_ID = b.DRVR_STEP_ID AND a.app_nme = 'EDW' and a.RUN_NME = 'S_2_O_CL_FA_ISO_NRT'"+
// 			" --AND a.run_stts_cd <> 'S'"+
// 			" --AND a.RUN_STTS_CD = 'R'"+
// 			" order by a.run_nme, a.grp_nbr, a.run_order_nbr;"