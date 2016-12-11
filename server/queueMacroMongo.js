
var mongoose = require('mongoose');
var assert = require('assert');

//jsonObject should be of the form {macroID, macroName, macroGroup, author, params, emergency}
exports.queueMacro = function(jsonObject){
  //Insert JSON object to application database.
  var PendingMacro = PendingMacro.createPendingMacro(jsonObject.macroID, jsonObject.macroName, jsonObject.macroGroup, jsonObject.author, jsonObject.params, jsonObject.emergency));
  PendingMacro.save();
}
