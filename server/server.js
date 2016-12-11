var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var libAccessor = require('./libAccessor.js');
var mongoAccessor = require('./mongoAccessor');
//var MongoClient = require('mongodb').MongoClient;

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

//Temporary get pending macros
app.get('/pending_macro', function(req, res){
  getPendingMacroData(function(data) {
      res.send(data)
  });
});


//Test functions for inserting mock data
app.post('/create_pending/:pendinginfo', function(req, res){
  res.send(postMacroData(req.params.pendinginfo));
});
app.post('/create_journal/:journalinfo', function(req, res){
  getPendingMacroData(new ObjectID(userid), function(data) {
      res.send(data)
  });
  res.send(postJournalEntry(req.params.journalinfo));
});

//
app.get('/journalentry', function(req, res){
    res.send(getJournalEntry(req.params.macroid));
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
function postJournalEntry(data){
  //Parse data and run mongo method
  mongoAccessor.createJournalEntry("1", "2", "3", "4", "5", {}, true);
}
function postMacroData(data){
  //parse data and run mongo method
  mongoAccessor.createPendingMacro("1", "2", "3", "4", {}, true);
}
function getJournalEntry(){
  mongoAccessor.readJournalEntries(
      function(entries){
        console.log(entries);
        return entries;
  });
}
function getMacroData(macroIDs){
    //macroIDs=comma separated list of ids
    //return macroIDs;
    //Parse list of ids
    //Make call to DB methods and get data
    //Maybe need a sync to get references
		//return data
    return macroIDs;
}
function getPendingMacroData(cb){
    //macroIDs=comma separated list of ids
    //return macroIDs;
    //Parse list of ids
    //Make call to DB methods and get data
    //Maybe need a sync to get references
		//return data
    console.log("Called get pending in the server");
    mongoAccessor.readPendingMacros(
      function(items){
        cb(items);
    });
    /*return mongoAccessor.test(
      function(i){
        return i;
      }
    )*/
}

//Replace res.send contents with database data
app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});
