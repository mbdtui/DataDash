import {getToken, updateCredentials} from './credentials';

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

// Get available UPDATE macros.
export function getMacrosAllTablesUpdate(cb) {
  sendXHR('GET', '/macros_all_tables/update', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

// Get available DELETE macros.
export function getMacrosAllTablesDelete(cb) {
  sendXHR('GET', '/macros_all_tables/delete', undefined, (xhr) => {
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

// Get data for the VIEW.
export function getRunStatusCode(app_name, run_name, run_status_code, cb){
  sendXHR('POST', '/view_run_status_code', {
    app_name: app_name,
    run_name: run_name,
    run_status_code: run_status_code
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Authenticates the user with the server.
 */
export function login(username, password, cb) {
  sendXHR('POST', '/login', { username: username, password: password}, (xhr) => {
    // Success callback: Login succeeded.
    var authData = JSON.parse(xhr.responseText);
    // Update credentials and indicate success via the callback!
    updateCredentials(authData.user, authData.token);
    cb(true);
  }, () => {
    // Error callback: Login failed.
    cb(false);
  });
}

// Send UPDATE macro request to the server.
export function requestUpdateMacroExecution(request_type, table_macro_params, cb) {
  sendXHR('POST','/request_macro_execution/update/'+request_type, table_macro_params, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

// Send DELETE macro request to the server.
export function requestDeleteMacroExecution(request_type, table_macro_params, cb) {
  sendXHR('POST','/request_macro_execution/delete/'+request_type, table_macro_params, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
//Post requests - Macro requests (run/delete), View Macro Request (no approval needed)

//send xml http request helper method
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());

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
      console.log('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out request if it takes too long
  xhr.timeout = 10000;

  xhr.addEventListener('error', function() {
    console.log('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  xhr.addEventListener('timeout', function() {
    console.log('Could not ' + verb + " " + resource + ": Request timed out.");
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
