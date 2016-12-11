
var mongoAccessor = require('./mongoAccessor');
var assert = require('assert');

//jsonObject should be of the form {macroID, macroName, macroGroup, author, params, emergency}
exports.queueMacro = function(jsonObject){
  //Insert JSON object to application database.
  mongoAccessor.createPendingMacro(jsonObject.macroID, jsonObject.macroName, jsonObject.macroGroup, jsonObject.author, jsonObject.params, jsonObject.emergency));
}

exports.insertJournal = function(jsonObject){
  mongoAccessor.createJournalEntry(jsonObject.macroID, jsonObject.macroName, jsonObject.macroGroup, jsonObject.author, jsonObject.reviewer, jsonObject.params, jsonObject.emergency);
}
