
//Tentative get request emulation (test)
//Get requests - get list of macro names, get macro history info, get pending macro info
//GetMacroData might cover all of the above (just requires handling of the data returned)

export function deletePendingMacro(objectID,cb){
  //TWO HTTPRequests one for deleting from pending and one for updating history
  sendXHR('DELETE', '/pending_macro/' + objectID, undefined, (xhr) => {
    // Call the callback with the data.
    cb();
  });
}


export function postJournalEntry(obj,cb){
  obj.reviewer = "TemporaryUser"; //Replace temporaryUser with user from AD
  sendXHR('POST', '/journal_entry', obj, (xhr) => {
    // Call the callback with the data.
    cb();
  });
}

//tentative - this does nothing
export function getMacroData(macroIDs, cb){
    var xhr = new XMLHttpRequest();
    if(true/*macroIDs is empty*/){
	xhr.open('GET', '/macro');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.addEventListener('load', function() {
	   cb(JSON.parse(xhr.responseText));
	});
    } else {
	xhr.open('GET', '/macro/' + macroIDs);
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.addEventListener('load', function() {
	    cb(JSON.parse(xhr.responseText));
	});
    }
    xhr.send();
    /*sendXHR('GET', '/macro', undefined, (xhr) =>{
    //Handle the callback with xhr return
    cb(JSON.parse(xhr.responseText));
    });*/
}

export function getMacrosAllTables(cb) {
  sendXHR('GET', '/macros_all_tables', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPendingMacros(cb) {
  sendXHR('GET', '/pending_macro', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getHistory(cb) {
  console.log("Called get history in client");
  sendXHR('GET', '/journal_entry', undefined, (xhr) => {
    // Call the callback with the data.
    console.log(typeof(xhr.responseText));
    cb(JSON.parse(xhr.responseText));
  });
}

export function getRunStatusCode(app_name, run_name, run_status_code, cb){
  sendXHR('POST', '/view_run_status_code', {
    app_name: app_name,
    run_name: run_name,
    run_status_code: run_status_code
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function requestMacroExecution(request_type, table_macro_params, cb) {
  sendXHR('POST','/request_macro_execution/'+request_type, table_macro_params, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//Post requests - Macro requests (run/delete), View Macro Request (no approval needed)

var token = 'eyJpZCI6NH0'; // <-- Put your base64'd JSON token here
//send xml http request helper method
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  //Server response
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      cb(xhr);
    } else {
      // Client/Server Error with potential response text
      var responseText = xhr.responseText;
      DDError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out request if it takes too long
  xhr.timeout = 10000;

  xhr.addEventListener('error', function() {
    DDError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  xhr.addEventListener('timeout', function() {
    DDError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      //body-> json string
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}
