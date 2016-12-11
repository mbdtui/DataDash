
var libAccessor = require('libAccessor.js');

exports.runViewStatusCodes = function(jsonObject){
	libAccessor.viewRunStatusCodes(jsonObject.parameters.app_name, jsonObject.parameters.run_name, jsonObject.parameters.run_status_code)
}