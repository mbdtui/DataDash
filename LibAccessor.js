var pg = require('pg');

/*
	1. PostgreSQL is required to install prior to running this program.
	Change the setting in the PostgreSQL_config object if needed.
	2. Clone and run another NodeJS app to populate the database from the log files.
	https://github.com/ThienDinh/PostgreSqlApp.git
*/

var PostgreSQL_config = {
	user: 'postgres',
	password: 'abc12345',
	database: 'postgres',
	host: '104.215.89.153',
	port: 5432,
	idleTimeoutMillis: 500
};

var client = new pg.Client(PostgreSQL_config);

// disconnect client when all queries are finished.
client.on('drain', client.end.bind(client)); 
// open connection to database.
client.connect(function (err) {
	if (err) {
		console.log(err);
		return;
	}
	testQuery1();
});

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