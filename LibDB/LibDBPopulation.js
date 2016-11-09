var pg = require('pg');
var fs = require('fs');
const readline = require('readline');

/*
	PostgreSQL is required to install prior to running this program.
	Change the setting in the PostgreSQL_config object if needed.
*/

var PostgreSQL_config = {
	user: 'postgres',
	password: 'abc12345',
	database: 'postgres',
	host: 'localhost',
	port: 5432
};

var client = new pg.Client(PostgreSQL_config);

// disconnect client when all queries are finished.
client.on('drain', client.end.bind(client)); 
// open connection to database.
client.connect();

//Drop all tables.
function dropTables() {
	client.query('drop table c_driver_schedule cascade; drop table c_driver_step cascade; drop table c_driver_step_detail cascade; drop table c_app_run_dependency cascade; drop table c_driver_step_detail_h cascade;', function(err, result) {
		// console.log('Result of dropTables(): ' + result);
		if(err) {
			console.log("Error dropping tables");
		}
		else {
			console.log("All tables dropped!");			
		}
	});
}

// Create all necessary tables.
function createTables() {
	// Table C_DRIVER_SCHEDULE.
	client.query("create table c_driver_schedule (" + 
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
		"sla_time time);", function(error, result) {
		if(error) {
			console.log('C_DRIVER_SCHEDULE creation failed!');
		}
		else {
			console.log('C_DRIVER_SCHEDULE creation succeded!');
		}
	});
	// Table C_DRIVER_STEP.
	client.query('create table c_driver_step ('+
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
		'actv_step_ind varchar(2));', function(err, result) {
		if(error) {
			console.log('C_DRIVER_STEP creation failed!');
		}
		else {
			console.log('C_DRIVER_STEP creation succeded!');
		}
	});
	// Table C_DRIVER_STEP_DETAIL.
	client.query('create table c_driver_step_detail ('+
		'drvr_step_dtl_id decimal(18,0),'+
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
		'lst_mdfd_dtm timestamp);', function (err, result) {
		if(error) {
			console.log('C_DRIVER_STEP_DETAIL creation failed!');
		}
		else {
			console.log('C_DRIVER_STEP_DETAIL creation succeded!');
		}
	});
	// Table C_APP_RUN_DEPENDENCY.
	client.query('create table c_app_run_dependency ('+
		'run_app_dpndnc_id decimal(18,0),'+
		'app_nme varchar(25) not null,'+
		'run_nme varchar(25) not null,'+
		'dependant_app_nme varchar(25) not null,'+
		'dependant_run_nme varchar(25) not null,'+
		'crt_dtm timestamp,'+
		'lst_mdfd_dtm timestamp,'+
		'app_run_id decimal(18,0),'+
		'dependant_app_run_id decimal(18,0));', function(err, result){
		if(error) {
			console.log('C_APP_RUN_DEPENDENCY creation failed!');
		}
		else {
			console.log('C_APP_RUN_DEPENDENCY creation succeded!');
		}
	});
	// Table C_DRIVER_STEP_DETAIL_H.
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
		if(error) {
			console.log('C_DRIVER_STEP_DETAIL_H creation failed!');
		}
		else {
			console.log('C_DRIVER_STEP_DETAIL_H creation succeded!');
		}
	});
}

// Load the requested table from data log file into the database.
function loadTable(table_name) {
	// Open file to read.
	const rl = readline.createInterface({
		input: fs.createReadStream('./datalogfiles/' + table_name + '.txt'),
		output: process.stdout,
		terminal: false
	});
	var counter = 0;
	rl.on('line', (line) => {
				counter = counter + 1;
				// If it is the first line in the data log, we skip it.
				if (counter === 1) return;

				// Split the array using the character Tab '\t' as the delimiter.
				var arr = line.split('\t');

				// Preprocess data in C_DRIVER_STEP. The data log for this table has error.
				if(table_name === 'c_driver_step') {
					// There are 19 columns in the table C_DRIVER_STEP.
					if(arr.length !== 19) {
						// Skip the row if it does not have exact 19 columns.
						return;
					}
					// var result = joinArray(arr, ',');
					// var line = result.result;
					// if(result.isUnusual) {
					// 	return;					
					// }
					/*
						Noted that there are 3 values that can be converted into integer.
						From the two 'y/n', we can go backward and forward.
						Also, after the path, must be the command, which is only one command, and the rest is parameters.
					*/
				}
				var query = formulateInsertQuery(table_name, arr);
				// Execute query.
				client.query(query, function(error, result) {
					if(error) {
						console.log('Fail: ' + query);
					}
					else {
						// console.log('Success: ' + query);
					}
				});

	});
	rl.on('close', () => {
		console.log('Prepocessing ' + table_name +' completed.');		
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

// Convert elements of the array of types of those elements.
function toNumberTypeArray(arr) {
	var t_arr = [];
	var counter = 0;
	var unusual = false;
	for(var i = 0; i < arr.length; i++) {
		var n = NaN;
		if(Number(arr[i]) === Number.parseInt(arr[i])) {
			counter = counter + 1;
			n = Number(arr[i]);
		}
		t_arr.push(n);
	}
	// Print lines that have unusual structure, which does not have exact 4 columns of integer types.
	if (counter !== 4) {
		console.log(t_arr.toString());
		unusual= true;
	}
	return {
		result: t_arr,
		isUnusual: unusual
	};
}

// Load all tables.
function loadTables() {

	// Still have trouble with it due to data log file error.
	loadTable('c_driver_step');

	// Loaded successfully.
	loadTable('c_driver_step_detail');

	// Loaded successfully.
	loadTable('c_driver_step_detail_h');

	// Loaded successfully.
	loadTable('c_app_run_dependency');

	// Loaded successfully.
	loadTable('c_driver_schedule');
}

// Test modified sample query.
function testQuery1() {
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
				}
			});
}

/*
	Execute functions. Uncomment the function call to run them.
	dropTables() drops all the tables in the database.
	createTables() creates all the tables, which are empty, in the database.
	loadTables() loads data log into the empty tables in the database.
	testQuery1() tests a sample query, whose result is in JSON format.
*/
// dropTables();
// createTables();
// loadTables();
testQuery1();