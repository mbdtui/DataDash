
/*
	1. PostgreSQL server, which need to be downloaded and installed, is required to be running prior to running this program.
	2. Change the setting in the 'PostgreSQL_config' object if needed.
	Note: table schema does not have constraints on it, because the provided data is not suitable,
	for example some columns in one table reference to other columns in another table, but the values do not match.
*/

var pg = require('pg');
var fs = require('fs');
const readline = require('readline');

// Configuration for connecting to PostgreSQL database.
var PostgreSQL_config = {
	user: 'postgres',
	password: 'abc12345',
	database: 'postgres',
	host: 'localhost',
	port: 5432,
};

// Load Liberty Mutual Mock Database into PostgreSQL database server.
// loadMockDB();


// open connection to database.
var client = null;
var datalogDir = null;

function loadMockDB(dir) {
	client = new pg.Client(PostgreSQL_config);
	datalogDir = dir;
	client.connect(function (err) {
		if (err) {
			console.log(err);
			return;
		}
		/*
			Execute functions. Uncomment the function call to run them.
			dropTables() drops all the tables in the database.
			createTables() creates all the tables, which are empty, in the database.
			loadTables() loads data log into the empty tables in the database.
		*/
		dropTables(function() {
			console.log();
			createTables(function() {
				console.log();
				loadTables(function() {
					console.log();
					console.log('Finished loading data log into the Liberty Mutual mock database.');
					client.end();
				});
			});
		});
	});
}

//Drop all tables.
function dropTables(cb) {
	client.query('drop table if exists c_driver_schedule cascade;'+
		' drop table if exists c_driver_schedule_h cascade;'+
		' drop table if exists c_driver_step cascade;'+
		' drop table if exists c_driver_step_h cascade;'+
		' drop table if exists c_driver_step_detail cascade;'+
		' drop table if exists c_driver_step_detail_h cascade;'+
		' drop table if exists c_app_run_dependency cascade;'+
		' drop table if exists c_app_run_dependency_h cascade;', function(err, result) {
		// console.log('Result of dropTables(): ' + result);
		if(err) {
			console.log("Error dropping tables" + err);
		}
		else {
			console.log("All tables dropped!");
			cb();
		}
	});
}

// Create all necessary tables.
function createTables(cb) {
	createDriverScheduleH(function() {
		createDriverStepH(function() {
			createDriverStepDetailH(function() {
				createAppRunDependencyH(function () {
					createDriverStepDetail(function () {
						createDriverSchedule(function() {
							createDriverStep(function() {
								createAppRunDependency(function(){
									cb();
								});
							});
						});
					})
				});
			});
		});
	});
}
function recreateDriverSchedule(client, cb) {

}
// Table C_DRIVER_SCHEDULE.
const number_of_columns_of_DriverSchedule = 16;
function createDriverSchedule(cb) {
	client.query("create table c_driver_schedule (" +
		"audt_id decimal(18,0) primary key,"+
		"app_nme varchar(25),"+
		"run_nme varchar(25),"+
		"run_nbr integer,"+
		"re_run_nbr integer,"+
		"schdl_start_dtm time,"+
		"stts_cd varchar(40),"+
		"vlutn_start_dtm time,"+
		"vlutn_end_dtm time,"+
		"run_start_dtm time,"+
		"run_end_dtm time,"+
		"crt_dtm time,"+
		"lst_mdfd_dtm time,"+
		"app_run_id decimal(18,0),"+
		"sla_date date,"+
		"sla_time time);"+
		"CREATE OR REPLACE FUNCTION process_c_driver_schedule() RETURNS TRIGGER AS $c_driver_schedule_h$"+
						" BEGIN" +
						" IF (TG_OP = 'DELETE') THEN" +
						" INSERT INTO c_driver_schedule_h SELECT OLD.*, now();" +
						" RETURN OLD;" +
						" ELSIF (TG_OP = 'UPDATE') THEN" +
						" INSERT INTO c_driver_schedule_h SELECT OLD.*, now();" +
						" RETURN OLD;" +
						" END IF;" +
						" RETURN NULL;" +
						" END;" +
						"$c_driver_schedule_h$ LANGUAGE plpgsql;" +
						"CREATE TRIGGER c_driver_schedule_h" +
						" AFTER UPDATE OR DELETE ON c_driver_schedule" +
						" FOR EACH ROW EXECUTE PROCEDURE process_c_driver_schedule();", function(err, result) {
		if(err) {
			console.log('C_DRIVER_SCHEDULE creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_SCHEDULE creation succeded!');
			cb();
		}
	});
}

// Table C_DRIVER_SCHEDULE_H.
const number_of_columns_of_DriverScheduleH = 17;
function createDriverScheduleH(cb) {
	client.query("create table c_driver_schedule_h (" +
		"audt_id decimal(18,0),"+
		"app_nme varchar(25),"+
		"run_nme varchar(25),"+
		"run_nbr integer,"+
		"re_run_nbr integer,"+
		"schdl_start_dtm time,"+
		"stts_cd varchar(40),"+
		"vlutn_start_dtm time,"+
		"vlutn_end_dtm time,"+
		"run_start_dtm time,"+
		"run_end_dtm time,"+
		"crt_dtm time,"+
		"lst_mdfd_dtm time,"+
		"app_run_id decimal(18,0),"+
		"sla_date date,"+
		"sla_time time,"+
		"hist_dtm time);", function(err, result) {
		if(err) {
			console.log('C_DRIVER_SCHEDULE_H creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_SCHEDULE_H creation succeded!');
			cb();
		}
	});
}

// Table C_DRIVER_STEP.
const number_of_columns_of_DriverStep = 19;
function createDriverStep(cb) {
	client.query('create table c_driver_step ('+
		'drvr_step_id decimal(18, 0) primary key,'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'grp_nbr integer not null,'+
		'grp_nme varchar(80),'+
		'run_order_nbr smallint not null,'+
		'path_txt varchar(80) null,'+
		'cmd_txt varchar(80) null,'+
		'prmtr_txt varchar(256),'+
		'grp_cncrrncy_ind varchar(2),'+
		'step_cncrrncy_ind varchar(2),'+
		'notify_txt varchar(128),'+
		'step_typ_cd varchar(40),'+
		'step_nme varchar(128),'+
		'err_prcs_nbr smallint,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp,'+
		'app_run_id decimal(18,0),'+
		'actv_step_ind varchar(2));'+
		"CREATE OR REPLACE FUNCTION process_c_driver_step() RETURNS TRIGGER AS $c_driver_step_h$"+
						" BEGIN" +
						" IF (TG_OP = 'DELETE') THEN" +
						" INSERT INTO c_driver_step_h SELECT OLD.*, now();" +
						" RETURN OLD;" +
						" ELSIF (TG_OP = 'UPDATE') THEN" +
						" INSERT INTO c_driver_step_h SELECT OLD.*, now();" +
						" RETURN NEW;" +
						" END IF;" +
						" RETURN NULL;" +
						" END;" +
						"$c_driver_step_h$ LANGUAGE plpgsql;" +
						"CREATE TRIGGER c_driver_step_h" +
						" AFTER UPDATE OR DELETE ON c_driver_step" +
						" FOR EACH ROW EXECUTE PROCEDURE process_c_driver_step();", function(err, result) {
		if(err) {
			console.log('C_DRIVER_STEP creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_STEP creation succeded!');
			cb();
		}
	});
}

// Table C_DRIVER_STEP_H.
const number_of_columns_of_DriverStepH = 20;
function createDriverStepH(cb) {
	client.query('create table c_driver_step_h ('+
		'drvr_step_id decimal(18, 0),'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'grp_nbr integer not null,'+
		'grp_nme varchar(80),'+
		'run_order_nbr smallint not null,'+
		'path_txt varchar(80) null,'+
		'cmd_txt varchar(80) null,'+
		'prmtr_txt varchar(256),'+
		'grp_cncrrncy_ind varchar(2),'+
		'step_cncrrncy_ind varchar(2),'+
		'notify_txt varchar(128),'+
		'step_typ_cd varchar(40),'+
		'step_nme varchar(128),'+
		'err_prcs_nbr smallint,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp,'+
		'app_run_id decimal(18,0),'+
		'actv_step_ind varchar(2),'+
		'hist_dtm time);', function(err, result) {
		if(err) {
			console.log('C_DRIVER_STEP_H creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_STEP_H creation succeded!');
			cb();
		}
	});
}

// Table C_DRIVER_STEP_DETAIL.
const number_of_columns_of_DriverStepDetail = 15;
function createDriverStepDetail(cb) {
	client.query('create table c_driver_step_detail ('+
		'drvr_step_dtl_id decimal(18,0) primary key,'+
		'audt_id decimal(18,0),'+
		'drvr_step_id decimal(18,0),'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'grp_nbr smallint not null,'+
		'run_order_nbr smallint not null,'+
		'run_stts_cd varchar(2) null,'+
		'err_prcs_nbr smallint,'+
		'sess_start_dtm timestamp,'+
		'sess_end_dtm timestamp,'+
		'run_start_dtm timestamp,'+
		'run_end_dtm timestamp,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp);'+
		"CREATE OR REPLACE FUNCTION process_c_driver_step_detail() RETURNS TRIGGER AS $c_driver_step_detail_h$"+
						" BEGIN" +
						" IF (TG_OP = 'DELETE') THEN" +
						" INSERT INTO c_driver_step_detail_h SELECT OLD.*, now();" +
						" RETURN OLD;" +
						" ELSIF (TG_OP = 'UPDATE') THEN" +
						" INSERT INTO c_driver_step_detail_h SELECT OLD.*, now();" +
						" RETURN NEW;" +
						" END IF;" +
						" RETURN NULL;" +
						" END;" +
						"$c_driver_step_detail_h$ LANGUAGE plpgsql;" +
						"CREATE TRIGGER c_driver_step_detail_h" +
						" AFTER UPDATE OR DELETE ON c_driver_step_detail" +
						" FOR EACH ROW EXECUTE PROCEDURE process_c_driver_step_detail();", function (err, result) {
		if(err) {
			console.log('C_DRIVER_STEP_DETAIL creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_STEP_DETAIL creation succeded!');
			cb();
		}
	});
}

// Table C_DRIVER_STEP_DETAIL_H.
const number_of_columns_of_DriverStepDetailH = 16;
function createDriverStepDetailH(cb) {
	client.query('create table c_driver_step_detail_h ('+
		'drvr_step_dtl_id decimal(18,0),'+
		'audt_id decimal(18,0),'+
		'drvr_step_id decimal(18,0),'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'grp_nbr integer not null,'+
		'run_order_nbr smallint not null,'+
		'run_stts_cd varchar(2) null,'+
		'err_prcs_nbr smallint,'+
		'sess_start_dtm timestamp,'+
		'sess_end_dtm timestamp,'+
		'run_start_dtm time,'+
		'run_end_dtm time,'+
		'crt_dtm time,'+
		'lst_mdfd_dtm time,'+
		'hist_dtm time);', function(err, result) {
		if(err) {
			console.log('C_DRIVER_STEP_DETAIL_H creation failed!' + err);
		}
		else {
			console.log('C_DRIVER_STEP_DETAIL_H creation succeded!');
			cb();
		}
	});
}

// Table C_APP_RUN_DEPENDENCY.
const number_of_columns_of_AppRunDependency = 9;
function createAppRunDependency(cb) {
	client.query('create table c_app_run_dependency ('+
		'run_app_dpndnc_id decimal(18,0) primary key,'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'dependant_app_nme varchar(25) not null,'+
		'dependant_run_nme varchar(25) not null,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp,'+
		'app_run_id decimal(18,0),'+
		'dependant_app_run_id decimal(18,0));'+
		"CREATE OR REPLACE FUNCTION process_c_app_run_dependency() RETURNS TRIGGER AS $c_app_run_dependency_h$"+
						" BEGIN" +
						" IF (TG_OP = 'DELETE') THEN" +
						" INSERT INTO c_app_run_dependency_h SELECT OLD.*, now();" +
						" RETURN OLD;" +
						" ELSIF (TG_OP = 'UPDATE') THEN" +
						" INSERT INTO c_app_run_dependency_h SELECT OLD.*, now();" +
						" RETURN NEW;" +
						" END IF;" +
						" RETURN NULL;" +
						" END;" +
						"$c_app_run_dependency_h$ LANGUAGE plpgsql;" +
						"CREATE TRIGGER c_app_run_dependency_h" +
						" AFTER UPDATE OR DELETE ON c_app_run_dependency" +
						" FOR EACH ROW EXECUTE PROCEDURE process_c_app_run_dependency();", function(err, result){
		if(err) {
			console.log('C_APP_RUN_DEPENDENCY creation failed!' + err);
		}
		else {
			console.log('C_APP_RUN_DEPENDENCY creation succeded!');
			cb();
		}
	});
}

// Table C_APP_RUN_DEPENDENCY_H.
const number_of_columns_of_AppRunDependencyH = 10;
function createAppRunDependencyH(cb) {
	client.query('create table c_app_run_dependency_h ('+
		'run_app_dpndnc_id decimal(18,0),'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'dependant_app_nme varchar(25) not null,'+
		'dependant_run_nme varchar(25) not null,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp,'+
		'app_run_id decimal(18,0),'+
		'dependant_app_run_id decimal(18,0),'+
		'hist_dtm time);', function(err, result){
		if(err) {
			console.log('C_APP_RUN_DEPENDENCY_H creation failed!' + err);
		}
		else {
			console.log('C_APP_RUN_DEPENDENCY_H creation succeded!');
			cb();
		}
	});
}


// Load all tables.
function loadTables(cb) {
	loadTable('c_driver_step', function() {
		loadTable('c_driver_schedule', function() {
			loadTable('c_app_run_dependency', function() {
				loadTable('c_driver_step_detail', function() {
					loadTable('c_driver_step_detail_h', function() {
						cb();
					});
				});
			});
		});
	});
}

function loadTable(table_name, cb) {
	reloadTable(datalogDir, table_name, cb);
}

// Load the requested table from data log file into the database.
function reloadTable(datalogDir, table_name, cb) {
	// Open file to read.
	const rl = readline.createInterface({
		input: fs.createReadStream(datalogDir + '/' + table_name + '.txt'),
		output: process.stdout,
		terminal: false
	});
	var counter = 0;
	var unmatching_number_of_columns = 0;
	var queries = [];
	console.log('');
	console.log('~~~ Lines with unmatching number of columns in table: ' + table_name.toUpperCase());
	// Read line by line.
	rl.on('line', (line) => {
				counter = counter + 1;
				// If it is the first line in the data log, we skip it.
				if (counter === 1) return;

				// Split the array using the character Tab '\t' as the delimiter.
				var arr = line.split('\t');

				switch(table_name) {
					// Preprocess data in C_DRIVER_STEP. The data log for this table has error.
					// There are 19 columns in the table C_DRIVER_STEP.
					case 'c_driver_step':
						if (arr.length !== number_of_columns_of_DriverStep) {
							unmatching_number_of_columns = unmatching_number_of_columns + 1;
							console.log('[' + counter + ']'+ line);
							return;
						}
						break;
					case 'c_driver_step_detail':
						if (arr.length !== number_of_columns_of_DriverStepDetail) {
							unmatching_number_of_columns = unmatching_number_of_columns + 1;
							console.log('[' + counter + ']'+ line);
							return;
						}
						break;
					case 'c_driver_step_detail_h':
						if (arr.length !== number_of_columns_of_DriverStepDetailH) {
							unmatching_number_of_columns = unmatching_number_of_columns + 1;
							console.log('[' + counter + ']'+ line);
							return;
						}
						break;
					case 'c_app_run_dependency':
						if (arr.length !== number_of_columns_of_AppRunDependency) {
							unmatching_number_of_columns = unmatching_number_of_columns + 1;
							console.log('[' + counter + ']'+ line);
							return;
						}
						break;
					case 'c_driver_schedule':
						if (arr.length !== number_of_columns_of_DriverSchedule) {
							unmatching_number_of_columns = unmatching_number_of_columns + 1;
							console.log('[' + counter + ']'+ line);
							return;
						}
						break;
					default:
						break;
				}
				var query = formulateInsertQuery(table_name, arr);
				queries.push(query);
	});
	// End of file.
	rl.on('close', () => {
		console.log('');
		console.log('=== Table: ' + table_name);
		console.log('---- Read: ' + counter + ' lines.');
		console.log('---- Need to be fixed: ' + unmatching_number_of_columns + ' lines.');
		console.log('---- To be executed: ' + queries.length + ' queries.');

		// Define function to execute query and call it.
		function executeQuery(queries, cb) {
			if (queries.length === 0) {
				console.log('Loading ' + table_name +' completed.');
				cb();
			}
			else {
				var query = queries.pop();
				// Execute query.
				client.query(query, function(error, result) {
					if(error) {
						console.log('Fail: ' + query);
						console.log('\tError: ' + error);
					}
					else {
						// console.log('Success: ' + query);
					}
					executeQuery(queries, cb);
				});
			}
		}
		executeQuery(queries, cb);
	});
}

//1519120014
//1524720016
// 16600001

// Form INSERT query to insert rows into database.
function formulateInsertQuery(table, arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === '?') {
			arr[i] = '\\N'; // \N means Null
		}
	}
	var parameters = joinArray(arr, ',');
	// console.log(parameters);
	var query = 'insert into ' + table + ' values(' + parameters + ');';
	return query;
}

// Join elements of an array into one line using the provided delimeter.
function joinArray(arr, delimiter) {
	// var result = toNumberTypeArray(arr);
	var t_arr = arr;
	var join = "'" + t_arr[0] + "'";
	for(var i = 1; i < t_arr.length; i++) {
		if(t_arr[i] === '\\N') {
			join = join + delimiter + 'NULL';
		}
		else {
			if(t_arr[i].indexOf("'") !== -1) {
				join = join + delimiter + "$$" + t_arr[i] + "$$";
			}
			else {
				join = join + delimiter + "'" + t_arr[i]+ "'";
			}
		}
	}
	// console.log(join);
	// result.result = join;
	return join;
}

function reloadDriverSchedule(dir){
	client = new pg.Client(PostgreSQL_config);
	client.connect((err) => {
		if(err) {

		}else{
			client.query('drop table if exists c_driver_schedule cascade;', (err, result) => {
				createDriverSchedule(() => {
					reloadTable(dir, 'c_driver_schedule', () => {
						console.log('Reloading c_driver_schedule done!');
						client.end();
					});
				});
			});
		}
	});
}

function reloadDriverStep(dir){
	client = new pg.Client(PostgreSQL_config);
	client.connect((err) => {
		if(err) {

		}else{
			client.query('drop table if exists c_driver_step cascade;', (err, result) => {
				createDriverStep(() => {
					reloadTable(dir, 'c_driver_step', () => {
						console.log('Reloading c_driver_step done!');
						client.end();
					});
				});
			});
		}
	});
}
function reloadDriverStepDetail(dir){
	client = new pg.Client(PostgreSQL_config);
	client.connect((err) => {
		if(err) {

		}else{
			client.query('drop table if exists c_driver_step_detail cascade;', (err, result) => {
				createDriverStepDetail(() => {
					reloadTable(dir, 'c_driver_step_detail', () => {
						console.log('Reloading c_driver_step_detail done!');
						client.end();
					});
				});
			});
		}
	});
}
exports.loadMockDB = loadMockDB;
exports.reloadDriverSchedule= reloadDriverSchedule;
exports.reloadDriverStep = reloadDriverStep;
exports.reloadDriverStepDetail = reloadDriverStepDetail;
