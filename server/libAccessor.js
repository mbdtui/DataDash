
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
// open connection to database.
client.connect(function (err) {
	if (err) {
		console.log(err);
		return;
	}
	else{		
		testQuery1(function() {
			client.end();
		});
	}
});

// Test modified sample query.
function testQuery1(cb) {
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