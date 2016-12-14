
var mongoAccessor = require('./mongoAccessor');
var assert = require('assert');

//jsonObject should be of the form {macroID, macroName, macroGroup, author, params, emergency}
exports.queueMacro = function(jsonObject){
  //Insert JSON object to application database pending macro table.
  mongoAccessor.createPendingMacro(jsonObject.macroID, jsonObject.macroName, jsonObject.macroGroup, jsonObject.author, jsonObject.params, jsonObject.emergency));
}

//JSONObject should be of the form{macroID, macroName, macroGropu, author, reviewer, params,emergency}
exports.insertJournal = function(jsonObject){
  //Inserts JSON object into application database journal table.
  mongoAccessor.createJournalEntry(jsonObject.macroID, jsonObject.macroName, jsonObject.macroGroup, jsonObject.author, jsonObject.reviewer, jsonObject.params, jsonObject.emergency);
}
