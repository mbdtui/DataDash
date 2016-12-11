var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var libAccessor = require('./libAccessor.js');

var app = express();

// Use text parser functionality of bodyParser.
app.use(bodyParser.text());
app.use(bodyParser.json());
// Serve files in the client/build directory.
app.use(express.static('../client/build'));

app.get('/', function (req, res){
    res.send('Hello World!');
});

app.get('/macro', function (req, res){
    res.send(getMacroData());
});

//get all macro ids. comma separated list.
app.get('/macro/:macroid', function(req, res){
    res.send(getMacroData(req.params.macroid));
});

app.get('/macros_for_table/:table_name/update', function(req, res) {
	var table_name = req.params.table_name;
	var available_macros;
	switch(table_name) {
		case 'driver_step':
			available_macros = [
			'update_active_step_indicator_by_driverstepid',
			'update_active_step_indicator_by_runname_driverstepid',
			'update_active_step_indicator_by_runname',
			'update_active_step_indicator_by_runname_groupnumber'
			];
			break;
		case 'driver_schedule':
			available_macros = [
			'update_schedule_starttime_by_runname_auditid',
			'update_status_code_by_runname_auditid',
			'update_valuation_enddate_by_runname_auditid',
			'update_valuation_startdate_by_runname_auditid',
			'update_sla_date_time_by_auditid',
			'update_sla_date_time_by_runname',
			'update_historical_sla_date_time_by_runname'
			];
			break;
		case 'driver_step_detail':
			available_macros = [
			'update_run_status_code_by_runname_groupnumber',
			'update_run_status_code_by_runname_driverstepdetail_id'
			];
			break;
	}
	// console.log(available_macros);
	res.send({ macros: available_macros});
});

app.get('/macros_for_table/:table_name/delete', function(req, res) {
	var table_name = req.params.table_name;
	var available_macros;
	switch(table_name) {
		case 'driver_step':
			available_macros = [
			'delete_all_entries_by_runname',
			'delete_all_entries_by_runname_groupnumber',
			'delete_all_entries_by_runname_driverstepid'
			];
			break;
		case 'driver_schedule':
			available_macros = [
			'delete_all_entries_by_runname'
			];
			break;
		case 'driver_step_detail':
			available_macros = [
			'delete_all_entries_by_runname'
			];
			break;
	}
	// console.log(available_macros);
	res.send({ macros: available_macros});
});

app.post('/view_run_status_code', function(req, res) {
	var app_name = req.body.app_name;
    var run_name = req.body.run_name;
    var run_status_code = req.body.run_status_code;
	libAccessor.viewRunStatusCode(app_name, run_name, run_status_code, (err, result) => {
		if(err) {
			res.status(400).end();
		}
		else {
			// console.log(JSON.stringify(result));
			res.send(result.rows);
		}
	});
});



function getMacroData(macroIDs){
    //macroIDs=comma separated list of ids

    //Parse list of ids
    //Make call to DB methods and get data
    //Maybe need a sync to get references
		//return data
}

//Replace res.send contents with database data
app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});


