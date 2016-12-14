var libAccessor = require('../libAccessor.js');
var LibDBLoader = require('../lib_mockDB_loader/LibDBLoader.js');
var driver_step = libAccessor.driver_step;
var driver_schedule = libAccessor.driver_schedule;
var driver_step_detail = libAccessor.driver_step_detail;
var viewRunStatusCode = libAccessor.viewRunStatusCode;
var executeQuery = libAccessor.executeQuery;

const util = require('util');

/** TESTS FOR DRIVER SCHEDULE **/

function test_driver_schedule_delete_all_entries_by_runname(cb){
    console.log('*** Test driver_schedule.delete_all_entries_by_runname: function(run_name, cb)');
    var run_name = ;
    console.log('run_name=' + run_name);

    executeQuery("select count(*) from c_driver_schedule;", function(err, result) {

        var number_of_rows_before_deletion = result.rows[0].count;

        executeQuery("select count(*) from c_driver_schedule where run_nme='" + run_name + "';", function(err, result){

            var number_of_rows_must_be_deleted = result.rows[0].count;

            driver_schedule.delete_all_entries_by_runname(run_name, function(err, result) {

                executeQuery("select count(*) from c_driver_schedule;", function(err, result) {

                    var number_of_rows_after_deletion = result.rows[0].count;
                    console.log('\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
                        '\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
                        '\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
                    if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
                        console.log('===> PASSED');
                    }else{
                        console.log('===> FAILED');
                    }
                    console.log();
                    cb();
                });
            });
        });
    });
}

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

				console.log('\n\t Old value=' + old_schdl_start_dtm +
						'\n\t Expected value=' + expected_schdl_start_dtm +
						'\n\t New value=' + new_schdl_start_dtm);
				if(new_schdl_start_dtm === expected_schdl_start_dtm){
					console.log('===> PASSED');
				} else {
					console.log('===> FAILED');
				}
				console.log();
			});
		});

	});
}

function test_driver_schedule_update_status_code_by_runname_auditid(cb){
    console.log('*** Test driver_schedule.update_status_code_by_runname_auditid: function(run_name, audit_id, status_code, cb)');
    var run_nme = 'nice_csat_ref';
    var audt_id = 48;
    var expected_stts_cd = ;
    console.log('run_name=' + run_nme);
    console.log('audit_id=' + audt_id);
    console.log('expected status_code=' + expected_stts_cd);

    executeQuery(util.format("select * from c_driver_schedule"+
        " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

        var old_stts_cd = result.rows[0].stts_cd;
        driver_schedule.update_status_code_by_runname_auditid(run_nme, audt_id, expected_stts_cd, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule"+
                " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

                var new_stts_cd = result.rows[0].stts_cd;

                console.log('\n\t Old value=' + old_stts_cd +
                    '\n\t Expected value=' + expected_stts_cd +
                    '\n\t New value=' + new_stts_cd);
                if(new_stts_cd === expected_stts_cd){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_schedule_update_valuation_enddate_by_runname_auditid(cb){
    console.log('*** Test driver_schedule.update_valuation_enddate_by_runname_auditid: function(run_name, audit_id, valuation_end_date, cb)');
    var run_nme = 'nice_csat_ref';
    var audt_id = 48;
    var expected_vlutn_end_dtm = ;
    console.log('run_name=' + run_nme);
    console.log('audit_id=' + audt_id);
    console.log('expected valuation_end_date=' + expected_vlutn_end_dtm);

    executeQuery(util.format("select * from c_driver_schedule"+
        " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

        var old_vlutn_end_dtm = result.rows[0].vlutn_end_dtm;
        driver_schedule.update_valuation_enddate_by_runname_auditid(run_nme, audt_id, expected_vlutn_end_dtm, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule"+
                " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

                var new_vlutn_end_dtm = result.rows[0].vlutn_end_dtm;

                console.log('\n\t Old value=' + old_vlutn_end_dtm +
                    '\n\t Expected value=' + expected_vlutn_end_dtm +
                    '\n\t New value=' + new_vlutn_end_dtm);
                if(new_vlutn_end_dtm === expected_vlutn_end_dtm){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_schedule_update_valuation_startdate_by_runname_auditid(cb){
    console.log('*** Test driver_schedule.update_valuation_startdate_by_runname_auditid: function(run_name, audit_id, valuation_start_date, cb)');
    var run_nme = 'nice_csat_ref';
    var audt_id = 48;
    var expected_vlutn_start_dtm = ;
    console.log('run_name=' + run_nme);
    console.log('audit_id=' + audt_id);
    console.log('expected valuation_start_date=' + expected_vlutn_start_dtm);

    executeQuery(util.format("select * from c_driver_schedule"+
        " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

        var old_vlutn_start_dtm = result.rows[0].vlutn_start_dtm;
        driver_schedule.update_valuation_startdate_by_runname_auditid(run_nme, audt_id, expected_vlutn_start_dtm, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule"+
                " where run_nme='%s' and audt_id='%s';", run_nme, audt_id), function(err, result){

                var new_vlutn_start_dtm = result.rows[0].vlutn_start_dtm;

                console.log('\n\t Old value=' + old_vlutn_start_dtm +
                    '\n\t Expected value=' + expected_vlutn_start_dtm +
                    '\n\t New value=' + new_vlutn_start_dtm);
                if(new_vlutn_start_dtm === expected_vlutn_start_dtm){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_schedule_update_sla_date_time_by_auditid(cb){
    console.log('*** Test driver_schedule.update_sla_date_time_by_auditid: function(audit_id, date, time, cb)');

    var audt_id = 48;
    var expected_sla_date =;
    var expected_sla_time=;

    console.log('audit_id=' + audt_id);
    console.log('expected sla_date=' + expected_sla_date);
    console.log('expected sla_time=' + expected_sla_time);

    executeQuery(util.format("select * from c_driver_schedule"+
        " where audt_id='%s';", audt_id), function(err, result){

        var old_sla_date = result.rows[0].sla_date;
        var old_sla_time = result.rows[0].sla_time;
        driver_schedule.update_sla_date_time_by_auditid(audt_id, expected_sla_date, expected_sla_time, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule"+
                " where audt_id='%s';", audt_id), function(err, result){

                var new_sla_date = result.rows[0].sla_date;
                var new_sla_time = result.rows[0].sla_time;


                console.log('\n\t (Old SLA Date, Old SLA Time)=' + '('+ old_sla_date + ',' + old_sla_time + ')' +
                    '\n\t (Expected SLA Date, Expected SLA Time)=' + '(' + expected_sla_date + ',' + expected_sla_time + ')'+
                    '\n\t (New SLA Date, New SLA Time)=' + '(' + new_sla_date + ',' + new_sla_time + ')');
                if(new_sla_date === expected_sla_date && new_sla_time === expected_sla_time){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_schedule_update_sla_date_time_by_runname(cb){
    console.log('*** Test driver_schedule.update_sla_date_time_by_auditid: function(run_name, date, time, cb)');

    var run_nme = 48;
    var expected_sla_date =;
    var expected_sla_time=;

    console.log('run_nme=' + run_nme);
    console.log('expected sla_date=' + expected_sla_date);
    console.log('expected sla_time=' + expected_sla_time);

    executeQuery(util.format("select * from c_driver_schedule"+
        " where run_nme='%s';", run_nme), function(err, result){

        var old_sla_date = result.rows[0].sla_date;
        var old_sla_time = result.rows[0].sla_time;
        driver_schedule.update_sla_date_time_by_runname(run_nme, expected_sla_date, expected_sla_time, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule"+
                " where run_nme='%s';", run_nme), function(err, result){

                var new_sla_date = result.rows[0].sla_date;
                var new_sla_time = result.rows[0].sla_time;


                console.log('\n\t (Old SLA Date, Old SLA Time)=' + '('+ old_sla_date + ',' + old_sla_time + ')' +
                    '\n\t (Expected SLA Date, Expected SLA Time)=' + '(' + expected_sla_date + ',' + expected_sla_time + ')'+
                    '\n\t (New SLA Date, New SLA Time)=' + '(' + new_sla_date + ',' + new_sla_time + ')');
                if(new_sla_date === expected_sla_date && new_sla_time === expected_sla_time){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_schedule_update_historical_sla_date_time_by_runname(cb){
    console.log('*** Test driver_schedule_h.update_historical_sla_date_time_by_auditid: function(run_name, date, time, cb)');

    var run_nme = 48;
    var expected_sla_date =;
    var expected_sla_time=;

    console.log('run_nme=' + run_nme);
    console.log('expected sla_date=' + expected_sla_date);
    console.log('expected sla_time=' + expected_sla_time);

    executeQuery(util.format("select * from c_driver_schedule_h"+
        " where run_nme='%s';", run_nme), function(err, result){

        var old_sla_date = result.rows[0].sla_date;
        var old_sla_time = result.rows[0].sla_time;
        driver_schedule.update_historical_sla_date_time_by_runname(run_nme, expected_sla_date, expected_sla_time, function(err, result) {

            executeQuery(util.format("select * from c_driver_schedule_h"+
                " where run_nme='%s';", run_nme), function(err, result){

                var new_sla_date = result.rows[0].sla_date;
                var new_sla_time = result.rows[0].sla_time;


                console.log('\n\t (Old SLA Date, Old SLA Time)=' + '('+ old_sla_date + ',' + old_sla_time + ')' +
                    '\n\t (Expected SLA Date, Expected SLA Time)=' + '(' + expected_sla_date + ',' + expected_sla_time + ')'+
                    '\n\t (New SLA Date, New SLA Time)=' + '(' + new_sla_date + ',' + new_sla_time + ')');
                if(new_sla_date === expected_sla_date && new_sla_time === expected_sla_time){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}








/** TESTS FOR DRIVER STEP **/
function test_driver_step_delete_all_entries_by_runname(cb){
	console.log('*** Test driver_step.delete_all_entries_by_runname: function(run_name, cb)');
	var run_name = 'V_2_O';
	console.log('run_name=' + run_name);

	executeQuery("select count(*) from c_driver_step;", function(err, result) {

		var number_of_rows_before_deletion = result.rows[0].count;

		executeQuery("select count(*) from c_driver_step where run_nme='" + run_name + "';", function(err, result){

			var number_of_rows_must_be_deleted = result.rows[0].count;

			driver_step.delete_all_entries_by_runname(run_name, function(err, result) {

				executeQuery("select count(*) from c_driver_step;", function(err, result) {

					var number_of_rows_after_deletion = result.rows[0].count;
					console.log('\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
							'\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
							'\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
					if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
						console.log('===> PASSED');
					}else{
						console.log('===> FAILED');
					}
					console.log();
					cb();
				});
			});				
		});
	});
}

function test_driver_step_delete_all_entries_by_runname_groupnumber(cb){
    console.log('*** Test driver_step.delete_all_entries_by_runname_groupnumber: function(run_name, group_number, cb)');
    var run_name = ;
    var group_number = ;
    console.log('run_name=' + run_name);
    console.log('group_number=' + group_number);

    executeQuery("select count(*) from c_driver_step;", function(err, result) {

        var number_of_rows_before_deletion = result.rows[0].count;

        executeQuery("select count(*) from c_driver_step where run_nme='%s' and grp_nbr='%s';" + run_name + group_number, function(err, result){

            var number_of_rows_must_be_deleted = result.rows[0].count;

            driver_step.delete_all_entries_by_runname_groupnumber(run_name, group_number, function(err, result) {

                executeQuery("select count(*) from c_driver_step;", function(err, result) {

                    var number_of_rows_after_deletion = result.rows[0].count;
                    console.log('\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
                        '\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
                        '\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
                    if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
                        console.log('===> PASSED');
                    }else{
                        console.log('===> FAILED');
                    }
                    console.log();
                    cb();
                });
            });
        });
    });
}

function test_driver_step_delete_all_entries_by_runname_driverstepid(cb){
    console.log('*** Test driver_step.delete_all_entries_by_runname_driverstepid: function(run_name, driver_step_id, cb)');
    var run_name = ;
    var driver_step_id = ;
    console.log('run_name=' + run_nme);
    console.log('driver_step_id=' + driver_step_id);

    executeQuery("select count(*) from c_driver_step;", function(err, result) {

        var number_of_rows_before_deletion = result.rows[0].count;

        executeQuery("select count(*) from c_driver_step where run_nme='%s' and drvr_step_id='%s';" + run_name + drvr_step_id, function(err, result){

            var number_of_rows_must_be_deleted = result.rows[0].count;

            driver_step.delete_all_entries_by_runname_groupnumber(run_name, driver_step_id, function(err, result) {

                executeQuery("select count(*) from c_driver_step where run_nme='%s' and drvr_step_id='%s';", function(err, result) {

                    var number_of_rows_after_deletion = result.rows[0].count;
                    console.log('\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
                        '\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
                        '\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
                    if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
                        console.log('===> PASSED');
                    }else{
                        console.log('===> FAILED');
                    }
                    console.log();
                    cb();
                });
            });
        });
    });

}
function test_driver_step_update_active_step_indicator_by_driverstepid(cb){
    console.log('*** Test driver_step.update_active_step_indicator_by_driverstepid: function(driver_step_id, active_step_indicator, cb)');
    var drvr_step_id =;
    var expected_actv_step_ind =;
    console.log('driver_step_id=' + drvr_step_id);
    console.log('active_step_indicator=' + expected_actv_step_ind);

    executeQuery(util.format("select * from c_driver_step"+
        " where drvr_step_id;", drvr_step_id), function(err, result){

        var old_actv_step_ind = result.rows[0].actv_step_ind;
        driver_step.update_active_step_indicator_by_driverstepid(drvr_step_id ,expected_actv_step_ind, function(err, result) {

            executeQuery(util.format("select * from c_driver_step"+
                " where drvr_step_id;", drvr_step_id), function(err, result){

                var new_actv_step_ind = result.rows[0].actv_step_ind;

                console.log('\n\t Old value=' + old_actv_step_ind +
                    '\n\t Expected value=' + expected_actv_step_ind +
                    '\n\t New value=' + new_actv_step_ind);
                if(new_actv_step_ind === expected_actv_step_ind){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_step_update_active_step_indicator_by_runname_driverstepid(cb){
    console.log('*** Test driver_step.update_active_step_indicator_by_runname_driverstepid: function(run_name,driver_step_id, active_step_indicator, cb)');
    var run_nme=;
    var drvr_step_id =;
    var expected_actv_step_ind =;
    console.log('run_nme=' + run_nme);
    console.log('driver_step_id=' + drvr_step_id);
    console.log('active_step_indicator=' + expected_actv_step_ind);

    executeQuery(util.format("select * from c_driver_step"+
        " where run_nme='%s' and drvr_step_id='%s';", run_nme, drvr_step_id), function(err, result){

        var old_actv_step_ind = result.rows[0].actv_step_ind;
        driver_step.update_active_step_indicator_by_runname_driverstepid(run_nme, drvr_step_id , expected_actv_step_ind, function(err, result) {

            executeQuery(util.format("select * from c_driver_step"+
                " where run_nme='%s' and drvr_step_id='%s';", run_nme, drvr_step_id), function(err, result){

                var new_actv_step_ind = result.rows[0].actv_step_ind;

                console.log('\n\t Old value=' + old_actv_step_ind +
                    '\n\t Expected value=' + expected_actv_step_ind +
                    '\n\t New value=' + new_actv_step_ind);
                if(new_actv_step_ind === expected_actv_step_ind){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}


function test_driver_step_update_active_step_indicator_by_runname(cb){
    console.log('*** Test driver_step.update_active_step_indicator_by_runname: function(run_name, active_step_indicator, cb)');
    var run_nme =;
    var expected_actv_step_ind =;
    console.log('run_name' + run_nme);
    console.log('active_step_indicator=' + expected_actv_step_ind);

    executeQuery(util.format("select * from c_driver_step"+
        " where run_nme;", run_nme), function(err, result){

        var old_actv_step_ind = result.rows[0].actv_step_ind;
        driver_step.update_active_step_indicator_by_runname(run_nme ,expected_actv_step_ind, function(err, result) {

            executeQuery(util.format("select * from c_driver_step"+
                " where run_nme;", run_nme), function(err, result){

                var new_actv_step_ind = result.rows[0].actv_step_ind;

                console.log('\n\t Old value=' + old_actv_step_ind +
                    '\n\t Expected value=' + expected_actv_step_ind +
                    '\n\t New value=' + new_actv_step_ind);
                if(new_actv_step_ind === expected_actv_step_ind){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_step_update_active_step_indicator_by_runname_groupnumber(cb){
    console.log('*** Test driver_step.update_active_step_indicator_by_runname_groupnumber: function(run_name,group_number, active_step_indicator, cb)');
    var run_nme=;
    var grp_nbr =;
    var expected_actv_step_ind =;
    console.log('run_name=' + run_nme);
    console.log('group_number=' + grp_nbr);
    console.log('active_step_indicator=' + expected_actv_step_ind);

    executeQuery(util.format("select * from c_driver_step"+
        " where run_nme='%s' and grp_nbr='%s';", run_nme, grp_nbr), function(err, result){

        var old_actv_step_ind = result.rows[0].actv_step_ind;
        driver_step.update_active_step_indicator_by_runname_groupnumber(run_nme, grp_nbr , expected_actv_step_ind, function(err, result) {

            executeQuery(util.format("select * from c_driver_step"+
                " where run_nme='%s' and grp_nbr='%s';", run_nme, grp_nbr), function(err, result){

                var new_actv_step_ind = result.rows[0].actv_step_ind;

                console.log('\n\t Old value=' + old_actv_step_ind +
                    '\n\t Expected value=' + expected_actv_step_ind +
                    '\n\t New value=' + new_actv_step_ind);
                if(new_actv_step_ind === expected_actv_step_ind){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}



/** TESTS FOR DRIVER STEP DETAILS **/

function test_driver_step_detail_delete_all_entries_by_runname(cb){
    console.log('*** Test driver_step_detail.delete_all_entries_by_runname: function(run_name, cb)');
    var run_name = ;
    console.log('run_name=' + run_name);

    executeQuery("select count(*) from c_driver_step_detail;", function(err, result) {

        var number_of_rows_before_deletion = result.rows[0].count;

        executeQuery("select count(*) from c_driver_step_detail where run_nme='" + run_name + "';", function(err, result){

            var number_of_rows_must_be_deleted = result.rows[0].count;

            driver_step_detail.delete_all_entries_by_runname(run_name, function(err, result) {

                executeQuery("select count(*) from c_driver_step_detail;", function(err, result) {

                    var number_of_rows_after_deletion = result.rows[0].count;
                    console.log('\n\tNumber of rows before deletion: ' + number_of_rows_before_deletion +
                        '\n\tNumber of rows must be deleted: ' + number_of_rows_must_be_deleted +
                        '\n\tNumber of rows after deletion: ' + number_of_rows_after_deletion);
                    if (number_of_rows_after_deletion == (number_of_rows_before_deletion - number_of_rows_must_be_deleted)){
                        console.log('===> PASSED');
                    }else{
                        console.log('===> FAILED');
                    }
                    console.log();
                    cb();
                });
            });
        });
    });
}

function test_driver_step_detail_update_run_status_code_by_runname_groupnumber(cb){
    console.log('*** Test driver_step_detail.update_run_status_code_by_runname_groupnumber: function(run_name,group_number, run_status_code, cb)');
    var run_nme=;
    var grp_nbr =;
    var expected_run_stts_cd =;
    console.log('run_name=' + run_nme);
    console.log('group_number=' + grp_nbr);
    console.log('run_status_code=' + expected_run_stts_cd);

    executeQuery(util.format("select * from c_driver_step_detail"+
        " where run_nme='%s' and grp_nbr='%s';", run_nme, grp_nbr), function(err, result){

        var old_run_stts_cd = result.rows[0].run_stts_cd;
        driver_step_detail.update_run_status_code_by_runname_groupnumber(run_nme, grp_nbr , run_stts_cd, function(err, result) {

            executeQuery(util.format("select * from c_driver_step_detail"+
                " where run_nme='%s' and grp_nbr='%s';", run_nme, grp_nbr), function(err, result){

                var new_run_stts_cd = result.rows[0].run_stts_cd;

                console.log('\n\t Old value=' + old_run_stts_cd +
                    '\n\t Expected value=' + expected_run_stts_cd +
                    '\n\t New value=' + new_run_stts_cd);
                if(new_run_stts_cd === expected_run_stts_cd){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}

function test_driver_step_detail_update_run_status_code_by_runname_driverstepdetail_id(cb){
    console.log('*** Test driver_step_detail.update_run_status_code_by_runname_driverstepdetail_id: function(run_name,driver_step_detail_id, run_status_code, cb)');
    var run_nme=;
    var drvr_step_dtl_id =;
    var expected_run_stts_cd =;
    console.log('run_name=' + run_nme);
    console.log('driver_step_detail_id=' + drvr_step_dtl_id);
    console.log('run_status_code=' + expected_run_stts_cd);

    executeQuery(util.format("select * from c_driver_step_detail"+
        " where run_nme='%s' and drvr_step_dtl_id='%s';", run_nme, drvr_step_dtl_id), function(err, result){

        var old_run_stts_cd = result.rows[0].run_stts_cd;
        driver_step_detail.update_run_status_code_by_runname_driverstepdetail_id(run_nme, drvr_step_dtl_id , run_stts_cd, function(err, result) {

            executeQuery(util.format("select * from c_driver_step_detail"+
                " where run_nme='%s' and drvr_step_dtl_id='%s';", run_nme, drvr_step_dtl_id), function(err, result){

                var new_run_stts_cd = result.rows[0].run_stts_cd;

                console.log('\n\t Old value=' + old_run_stts_cd +
                    '\n\t Expected value=' + expected_run_stts_cd +
                    '\n\t New value=' + new_run_stts_cd);
                if(new_run_stts_cd === expected_run_stts_cd){
                    console.log('===> PASSED');
                } else {
                    console.log('===> FAILED');
                }
                console.log();
            });
        });

    });
}





// test_driver_step_detail_delete_all_entries_by_runname(()=>{
//     LibDBLoader.reloadDriverStep('../lib_mockDB_loader/LibDataLogs');
// });

/** Reset for each tables. */
// LibDBLoader.reloadDriverSchedule('../lib_mockDB_loader/LibDataLogs');
// LibDBLoader.reloadDriverStep('../lib_mockDB_loader/LibDataLogs');
// LibDBLoader.reloadDriverStepDetail('../lib_mockDB_loader/LibDataLogs');

// Reset all tables.
// LibDBLoader.loadMockDB('../lib_mockDB_loader/LibDataLogs');
//
// // Call tests.
// function testAll(){
// 	test_driver_step_delete_all_entries_by_runname(()=>{
//
// 	test_driver_schedule_update_schedule_starttime_by_runname_auditid(()=>{
//
// 	})
// 	});
// }

testAll();


