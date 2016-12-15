
var libAccessor = require('./data_accessors/libAccessor.js');

exports.viewRunStatusCode = function(jsonObject, cb){
	libAccessor.viewRunStatusCode(jsonObject.app_name, jsonObject.run_name, jsonObject.run_status_code, cb)
}