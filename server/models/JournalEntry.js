var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journalEntrySchema = new Schema({
  //macroID: String,
  macroName: String,
  macroType: String,
  macroTable: String,
  macroFunction: String,
  //macroGroup: String,
  author: String,
  macroParams: Object,
  reviewer: String,
  emergency: Boolean,
  runStatus: String,
  reviewStatus: String,
  created_at: Date,
  approved_at: Date
});

journalEntrySchema.pre('save', function(next) {
  var currentDate = new Date();
  if (!this.approved_at) this.approved_at = currentDate;
  next();
});

var JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
