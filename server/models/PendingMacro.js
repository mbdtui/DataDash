var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pendingMacroSchema = new Schema({
//macroID: String,
  macroName: String,
  macroType: String,
  macroTable: String,
  macroFunction: String,
  //macroGroup: String,
  author: String,
  macroParams: Object,
  emergency: Boolean,
  created_at: Date
});

pendingMacroSchema.pre('save', function(next) {
  var currentDate = new Date();
  if (!this.created_at) this.created_at = currentDate;
  next();
});

var PendingMacro = mongoose.model('PendingMacro', pendingMacroSchema);

module.exports = PendingMacro;
