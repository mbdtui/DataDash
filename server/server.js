var auth = require('./api/dummy-auth.js'); // change to auth.js for real authentication against AD
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoAccessor = require('./data_accessors/mongoAccessor');
var mongoDummyData = require('./mongoDummyData');
var updateBusiness = require('./updateBusiness');
var viewBusiness = require('./viewBusiness');
var deleteBusiness = require('./deleteBusiness');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secretKey = "7d672134-7365-40d8-acd6-ca6a82728471";
var app = express();

// Use text parser functionality of bodyParser.
app.use(bodyParser.text());
app.use(bodyParser.json());
// Serve files in the client/build directory.
app.use(express.static('../client/build'));

  app.post('/login', function(req, res) {
    // TODO error handling for when ActiveDirectory is unreachable
    // TODO check that the user is not already logged in
    // TODO code cleanup. could make this into a series of if blocks instead of nested code
    // TODO use user module instead of data accessor code
    var loginData = req.body;
    var username = loginData.username;
    var pw = loginData.password;
    var group = null;

    if (auth.authenticate(username, pw)) {
      // password and username were correct
      group = auth.getUserGroup(username);
      if (group != null) {
        // authorized
        jwt.sign({ username: username,
                   group: group
                 }, secretKey, { expiresIn: "7 days" }, function(token) {
          // We have the token.
          // Send the user, group and the token to the client.
          res.send({
            username: username,
            group: group,
            token: token
          });
        });
      }
      else {
        res.status(401).send({
          error : 'User is not authorized to use DataDash'
        });
      }
    }
    else {
      res.status(401).send({
        error : 'Credentials are incorrect'
      });
    }
  });


app.get('/macro', function (req, res){
    res.send(getMacroData());
});

//get all macro ids. comma separated list.
app.get('/macro/:macroid', function(req, res){
    res.send(getMacroData(req.params.macroid));
});

app.get('/macros_all_tables/delete', function(req, res) {
	var macros_delete = {
			'c_driver_schedule': {
				'delete_all_entries_by_runname': {
					'run_name':''
				},
			},
			'c_driver_step': {
				'delete_all_entries_by_runname': {
					'run_name':''
				},
				'delete_all_entries_by_runname_groupnumber': {
					'run_name':'', 'group_number':''
				},
				'delete_all_entries_by_runname_driverstepid': {
					'run_name':'', 'driver_step_id':''
				}
			},
			'c_driver_step_detail': {
				'delete_all_entries_by_runname': {
					'run_name':''
				}
			}
		};
	res.send(macros_delete);
})

app.get('/macros_all_tables/update', function(req, res) {
	var macros_update = {
			'c_driver_schedule': {
				'update_schedule_starttime_by_runname_auditid': {
					'run_name': '',
					'audit_id': '',
					'schedule_start_time': ''
				},
				'update_status_code_by_runname_auditid': {
					'run_name':'',
					'audit_id':'',
					'status_code':''
				},
				'update_valuation_enddate_by_runname_auditid': {
					'run_name':'',
					'audit_id':'',
					'valuation_end_date':''
				},
				'update_valuation_startdate_by_runname_auditid': {
					'run_name':'',
					'audit_id':'',
					'valuation_start_date':''
				},
				'update_sla_date_time_by_auditid': {
					'audit_id':'', 'date':'', 'time':''
				},
				'update_sla_date_time_by_runname': {
					'run_name':'', 'date':'', 'time':''
				},
				'update_historical_sla_date_time_by_runname': {
					'run_name':'', 'date':'', 'time':''
				}
			},
			'c_driver_step': {
				'update_active_step_indicator_by_driverstepid': {
					'driver_step_id':'', 'active_step_indicator':''
				},
				'update_active_step_indicator_by_runname_driverstepid': {
					'run_name':'', 'driver_step_id':'', 'active_step_indicator':''
				},
				'update_active_step_indicator_by_runname': {
					'run_name':'', 'active_step_indicator':''
				},
				'update_active_step_indicator_by_runname_groupnumber': {
					'run_name':'', 'group_number':'', 'active_step_indicator':''
				}
			},
			'c_driver_step_detail': {
				'update_run_status_code_by_runname_groupnumber': {
					'run_name':'', 'group_number':'', 'run_status_code':''
				},
				'update_run_status_code_by_runname_driverstepdetail_id': {
					'run_name':'', 'driver_step_detail_id':'', 'run_status_code':''
				}
			}
	};
	// console.log(available_macros);
	res.send(macros_update);
});

app.get('/pending_macro', function(req, res){
  getPendingMacroData(function(data) {
      res.send(data);
  });
});


//Test functions for inserting mock data
app.post('/create_pending/:pendinginfo', function(req, res){
  res.send(postMacroData(req.params.pendinginfo));
});
app.post('/create_journal/:journalinfo', function(req, res){
  res.send(postJournalEntry(req.params.journalinfo));
});

//
app.get('/journal_entry', function(req, res){
  getJournalEntry(function(data) {
    res.send(data);
  });
});


// Handle VIEW request.
app.post('/view_run_status_code', function(req, res) {
	var appn_runn_statusc = req.body;
	viewBusiness.viewRunStatusCode(appn_runn_statusc, (err, result) => {
		if(err) {
			res.status(400).end();
		}
		else {
			// console.log(JSON.stringify(result));
			res.send(result.rows);
		}
	});
});

// Handle UPDATE macro execution request.
app.post('/request_macro_execution/update/:request_type', function(req, res) {
	var requestType = req.params.request_type;
	var proposed_macro = req.body;
	// If the request is an emergency one.
	if(requestType === 'emergency') {
		console.log('Received:' + JSON.stringify(proposed_macro));
    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = "";//Remove this later
    var created_at = new Date();
    mongoAccessor.createJournalEntry(macroName, macroType, macroTable, macroFunction, macroParams, "testUser", "testReviewer", emergency, created_at);
		// Run update business.
		updateBusiness.runUpdateMacro(proposed_macro, (err, result) => {
			// If error,
			if(err) {
				// send raw error to client.
				res.send({status:'error', error:err});
			} else {
				res.send({status:'success', result:result});
			}
		});
	}
  else if(requestType === 'approved_peer_review'){
  	console.log('Received:' + JSON.stringify(proposed_macro));
    console.log("Running approved peer review");
    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = "";//Remove this later
    var created_at = new Date();
    mongoAccessor.createJournalEntry(macroName, macroType, macroTable, macroFunction, macroParams, "testUser", "testReviewer", emergency, created_at);
		// Run update business.
		updateBusiness.runUpdateMacro(proposed_macro, (err, result) => {
			// If error,
			if(err) {
				// send raw error to client.
				res.send({status:'error', error:err});
			} else {
				res.send({status:'success', result:result});
			}
		});
  }
	// else if it is a peer review one.
	else if(requestType === 'peer_review'){
		// Peer review request.
    //Create entry in the pending macros table
    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = req.body.name; //Later add to GUI macroName
    mongoAccessor.createPendingMacro(/*macroID,*/ macroName, macroType, macroTable, macroFunction, "TestUser", macroParams, emergency);
		res.status(200).end();
	}
	// else it is an invalid request.
	else {
		res.status(400).end();
	}
});

// Handle DELETE macro execution request.
app.post('/request_macro_execution/delete/:request_type', function(req, res) {
  console.log('Received:' + JSON.stringify(proposed_macro));
  console.log("Running approved peer review");
	var requestType = req.params.request_type;
	var proposed_macro = req.body;
	// If the request is an emergency one.
	if(requestType === 'emergency') {
		console.log('Received:' + JSON.stringify(proposed_macro));

    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = ""; //Remove this later
    if(typeof(req.body.created_at)===undefined){
      created_at = new Date();
    } else {
      created_at = req.body.created_at;
    }
    mongoAccessor.createJournalEntry(macroName, macroType, macroTable, macroFunction, macroParams, "testUser", "testReviewer", emergency, created_at);
		deleteBusiness.runDeleteMacro(proposed_macro, (err, result) => {
			// If error,
			if(err) {
				// send raw error to client.
				res.send({status:'error', error:err});
			} else {
				res.send({status:'success', result:result});
			}
		});
	}
  else if(requestType === 'approved_peer_review'){
    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = ""; //Remove this later
    var created_at = new Date();
    mongoAccessor.createJournalEntry(macroName, macroType, macroTable, macroFunction, macroParams, "testUser", "testReviewer", emergency, created_at);
		deleteBusiness.runDeleteMacro(proposed_macro, (err, result) => {
			// If error,
			if(err) {
				// send raw error to client.
				res.send({status:'error', error:err});
			} else {
				res.send({status:'success', result:result});
			}
		});
  }
	// else if it is a peer review one.
	else if(requestType === 'peer_review'){
    // Peer review request.
    //Create entry in the pending macros table
    var emergency = false;
    var macroType = req.body.macroType;
    var macroParams = req.body.params;
    var macroFunction = req.body.function_called;
    var macroTable = req.body.table;
    var macroName = req.body.name; //Later add to GUI macroName
    mongoAccessor.createPendingMacro(/*macroID,*/ macroName, macroType, macroTable, macroFunction, "TestUser", macroParams, emergency);
		res.status(200).end();
	}
	// else it is an invalid request.
	else {
		res.status(400).end();
	}
});

app.post('/journal_entry', function(req, res) {
  //req.body is a JSON object holding macroID, macroName, macroGroup, author, emergency, reviewer
  //at the very least. (mongodb should handle creation time and unique obj ids)
  mongoAccessor.createJournalEntry(
    //req.body.macroID,
    req.body.macroName,
    req.body.macroType,
    req.body.macroTable,
    req.body.macroFunction,
    //req.body.macroGroup,
    req.body.macroParams,
    req.body.author,
    req.body.reviewer,
    req.body.emergency,
    req.body.created_at
  );
  res.send();
});



app.delete('/pending_macro/:macroID', function(req, res){
  console.log("In server folder attempting macro deletion");
  var macroID = req.params.macroID;
  mongoAccessor.deletePendingMacro({ _id: macroID});
  //Blank for success
  res.send();
});

function postJournalEntry(data){
  //Parse data and run mongo method
  mongoAccessor.createJournalEntry("1", "2", "3", "4", "5", {}, true);
}
function postMacroData(data){
  //parse data and run mongo method
  mongoAccessor.createPendingMacro("1", "2", "3", "4", {}, true);
}
function getJournalEntry(cb){
  console.log("Called get history in server");
  mongoAccessor.readJournalEntries(
    function(items){
      cb(items);
  });
}

function getPendingMacroData(cb){
    mongoAccessor.readPendingMacros(
      function(items){
        cb(items);
    });
}

//Replace res.send contents with database data
app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});
